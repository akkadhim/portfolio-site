particlesJS("particles-js", {
	particles: {
		number: {
			value: 150,
			density: {
				enable: true,
				value_area: 800,
			},
		},
		color: {
			value: "#ffffff",
		},
		shape: {
			type: "circle",
			stroke: {
				width: 1,
				color: "#ffffff",
			},
			polygon: {
				nb_sides: 3,
			},
			image: {
				src: "img/github.svg",
				width: 100,
				height: 100,
			},
		},
		opacity: {
			value: 0.3866823443998136,
			random: false,
			anim: {
				enable: false,
				speed: 1,
				opacity_min: 0.1,
				sync: false,
			},
		},
		size: {
			value: 3.945738208161363,
			random: true,
			anim: {
				enable: false,
				speed: 131.86813186813185,
				size_min: 0.1,
				sync: false,
			},
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: "#ffffff",
			opacity: 0.8,
			width: 2,
		},
		move: {
			enable: true,
			speed: 2,
			direction: "none",
			random: false,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
		},
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: {
				enable: true,
				mode: "grab",
			},
			onclick: {
				enable: true,
				mode: "push",
			},
			resize: true,
		},
		modes: {
			grab: {
				distance: 400,
				line_linked: {
					opacity: 1,
				},
			},
			bubble: {
				distance: 400,
				size: 40,
				duration: 2,
				opacity: 8,
				speed: 3,
			},
			repulse: {
				distance: 200,
				duration: 0.4,
			},
			push: {
				particles_nb: 4,
			},
			remove: {
				particles_nb: 2,
			},
		},
	},
	retina_detect: true,
});

/* ---- stats.js config ---- */
var count_particles, update;
stats = new Stats();
stats.setMode(4);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
count_particlesx = document.querySelector(".js-count-particles");

// Animation control variables
let animationRunning = true;
let animationFrame;

update = function () {
	stats.begin();
	stats.end();
	// if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
	//   count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
	// }
	if (animationRunning) {
		animationFrame = requestAnimationFrame(update);
	}
};

// Start the animation
animationFrame = requestAnimationFrame(update);

// Animation Control Button Functionality
document.addEventListener('DOMContentLoaded', function() {
	const controlBtn = document.getElementById('animation-control');
	const animationIcon = document.getElementById('animation-icon');
	
	if (controlBtn && animationIcon) {
		controlBtn.addEventListener('click', function() {
			if (animationRunning) {
				// Pause animation
				animationRunning = false;
				cancelAnimationFrame(animationFrame);
				
				// Stop particles animation
				if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
					window.pJSDom[0].pJS.particles.move.enable = false;
					// Clear the canvas to stop visual updates
					window.pJSDom[0].pJS.fn.canvasClear();
				}
				
				// Update button
				animationIcon.className = 'fa fa-play';
				controlBtn.classList.add('paused');
				controlBtn.title = 'Play Background Animation';
			} else {
				// Resume animation
				animationRunning = true;
				
				// Resume particles animation
				if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
					window.pJSDom[0].pJS.particles.move.enable = true;
					// Restart the animation loop
					window.pJSDom[0].pJS.fn.vendors.draw();
				}
				
				// Restart the update loop
				animationFrame = requestAnimationFrame(update);
				
				// Update button
				animationIcon.className = 'fa fa-pause';
				controlBtn.classList.remove('paused');
				controlBtn.title = 'Pause Background Animation';
			}
		});
	}
});
