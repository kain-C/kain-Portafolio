 // Selecciona el canvas y ajusta su contexto de dibujo
 const canvas = document.getElementById("background");
 const ctx = canvas.getContext("2d");

 // Ajustar tamaño del canvas según la ventana
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 

 // Redimensionar canvas dinámicamente
 window.addEventListener("resize", () => {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     initParticles(); // Reiniciar partículas al cambiar tamaño
 });

 // Configuración inicial de partículas
 const particlesArray = []; // Almacena las partículas
 const numParticles = 100; // Cantidad de partículas en pantalla

 // Clase que define una partícula
 class Particle {
     constructor(x, y, size, speedX, speedY, color, opacity) {
         this.x = x; // Posición X inicial
         this.y = y; // Posición Y inicial
         this.size = size; // Tamaño de la partícula
         this.speedX = speedX; // Velocidad en X
         this.speedY = speedY; // Velocidad en Y
         this.color = color; // Color blanco o negro
         this.opacity = opacity; // Opacidad inicial
         this.fadeSpeed = 1 / (60 * 60); // Velocidad de desvanecimiento
         // 1 min = 60 seg animacion 60 x 3600 cuadros por segundo a 60 fps 
     }

     // Dibuja la partícula en el canvas
     draw() {
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
         ctx.fillStyle = `rgba(${this.color}, ${this.color}, ${this.color}, ${this.opacity})`;
         ctx.fill();
     }

     // Actualiza la posición y la opacidad de la partícula
     update() {
         this.x += this.speedX; // Mover en X
         this.y += this.speedY; // Mover en Y

         // Rebote en los bordes
         if (this.x < 0 || this.x > canvas.width) {
             this.speedX *= -1; // Cambia dirección
         }
         if (this.y < 0 || this.y > canvas.height) {
             this.speedY *= -1; // Cambia dirección
         }

         // Ajustar opacidad para crear efecto de desvanecimiento
         this.opacity -= this.fadeSpeed;
         if (this.opacity <= 0) {
             this.opacity = 1; // Reinicia opacidad
             this.color = Math.random() > 0.5 ? 255 : 0; // Cambia entre blanco (255) y negro (0)
         }
     }
 }

 // Inicializa las partículas
 function initParticles() {
     particlesArray.length = 0; // Vacía el array de partículas
     for (let i = 0; i < numParticles; i++) {
         const size = Math.random() * 2 + 1; // Tamaño entre 2 y 6
         const x = Math.random() * canvas.width; // Posición inicial aleatoria X
         const y = Math.random() * canvas.height; // Posición inicial aleatoria Y
         const speedX = (Math.random() - 0.05) * 0.05; // Velocidad aleatoria X
         const speedY = (Math.random() - 0.05) * 0.05; // Velocidad aleatoria Y
         const color = Math.random() > 0.5 ? 255 : 0; // Blanco (255) o negro (0)
         const opacity = Math.random(); // Opacidad inicial aleatoria entre 0 y 1
         particlesArray.push(new Particle(x, y, size, speedX, speedY, color, opacity));
     }
 }

 // Animación de partículas
 function animate() {
     // Limpia el canvas en cada frame
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     // Actualiza y dibuja cada partícula
     particlesArray.forEach(particle => {
         particle.update();
         particle.draw();
     });

     // Solicita el siguiente frame de animación
     requestAnimationFrame(animate);
 }

 // Inicializa y comienza la animación
 initParticles();
 animate();