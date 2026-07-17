if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10); 
});

document.addEventListener("DOMContentLoaded", function() {
    
    if (typeof gsap !== 'undefined') {
        gsap.fromTo('.cl-phoneleft',
            { x: 250, y: 150, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
        );

        gsap.fromTo('.cl-phoneright',
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
        );
    }
    
    const headerBottom = document.querySelector('.cl-headerbottom');
    const videoWrapper = document.querySelector('.cl-video-wrapper');
    const videoContainer = document.querySelector('.cl-video');
    const gateVideo = document.getElementById('gate-video');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (headerBottom) {
            if (currentScroll > 100) { 
                headerBottom.classList.remove('scrolled-grey');
                headerBottom.classList.add('scrolled-dark');
            } else if (currentScroll > 40) { 
                headerBottom.classList.remove('scrolled-dark');
                headerBottom.classList.add('scrolled-grey');
            } else {
                headerBottom.classList.remove('scrolled-grey', 'scrolled-dark');
            }
        }

        if (videoWrapper && videoContainer && gateVideo) {
            const rect = videoWrapper.getBoundingClientRect();
            if (rect.top <= 0 && rect.bottom >= window.innerHeight * 0.5) {
                if (!videoContainer.classList.contains('is-open')) {
                    videoContainer.classList.add('is-open'); 
                    gateVideo.play();                      
                }
            }
            else if (rect.top > 0   ) {
                if (videoContainer.classList.contains('is-open')) {
                    videoContainer.classList.remove('is-open'); 
                    gateVideo.pause();                          
                }
            }
        }
    });

    const btnCart = document.getElementById('btn-cart');
    const btnSearch = document.getElementById('btn-search');
    const btnMenu = document.getElementById('btn-menu');

    const dropdownCart = document.getElementById('dropdown-cart');
    const dropdownSearch = document.getElementById('dropdown-search');
    const dropdownMenu = document.getElementById('dropdown-menu');

    const closeBtnsHeader = document.querySelectorAll('.cl-close-btn');

    function closeAllDropdowns() {
        dropdownCart.classList.remove('is-active');
        dropdownSearch.classList.remove('is-active');
        dropdownMenu.classList.remove('is-active');
    }

    if (btnCart && dropdownCart) {
        btnCart.addEventListener('click', () => {
            if (dropdownCart.classList.contains('is-active')) {
                dropdownCart.classList.remove('is-active');
            } else {
                closeAllDropdowns();
                dropdownCart.classList.add('is-active');
            }
        });
    }

    if (btnSearch && dropdownSearch) {
        btnSearch.addEventListener('click', () => {
            if (dropdownSearch.classList.contains('is-active')) {
                dropdownSearch.classList.remove('is-active');
            } else {
                closeAllDropdowns();
                dropdownSearch.classList.add('is-active');
                setTimeout(() => {
                    const searchInput = dropdownSearch.querySelector('input');
                    if(searchInput) searchInput.focus();
                }, 100);
            }
        });
    }

    if (btnMenu && dropdownMenu) {
        btnMenu.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('is-active')) {
                dropdownMenu.classList.remove('is-active');
            } else {
                closeAllDropdowns();
                dropdownMenu.classList.add('is-active');
            }
        });
    }

    if (closeBtnsHeader.length > 0) {
        closeBtnsHeader.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetMenu = document.getElementById(targetId);
                if (targetMenu) {
                    targetMenu.classList.remove('is-active');
                }
            });
        });
    }

    const swiper = new Swiper('.cl-features-slider', {
        slidesPerView: 'auto',       
        centeredSlides: true,        
        spaceBetween: 30,            
        loop: true,                
        speed: 900,                 
        grabCursor: true,            
        autoplay: {
            delay: 2000,            
            disableOnInteraction: false, 
            pauseOnMouseEnter: true, 
        },
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        pagination: {
            el: '.dots-container',
            clickable: true,
            bulletClass: 'dot',
            bulletActiveClass: 'active',
        },
    });

    const controlsWrapper = document.querySelector('.cl-boxcontrol-wrapper');
    const mouseLight = document.querySelector('.mouse-light-glow');

    if (controlsWrapper && mouseLight) {
        controlsWrapper.addEventListener('mouseenter', () => {
            mouseLight.style.transition = 'opacity 0.3s ease'; 
            mouseLight.style.opacity = '1';
        });
        
        controlsWrapper.addEventListener('mousemove', (e) => {
            const rect = controlsWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            mouseLight.style.left = `${x}px`;
            mouseLight.style.top = `${y}px`;
        });
        
        controlsWrapper.addEventListener('mouseleave', () => {
            mouseLight.style.transition = 'all 0.5s ease'; 
            mouseLight.style.left = '50%';
            mouseLight.style.top = '50%';
            mouseLight.style.opacity = '0.5'; 
        });
    }

    const colorSection = document.getElementById('cl-color-section');
    
    if (colorSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    colorSection.classList.add('cl-inview'); 
                } else {
                    colorSection.classList.remove('cl-inview'); 
                }
            });
        }, { threshold: 0.3 });

        observer.observe(colorSection);
    }

    const colorDots = document.querySelectorAll('.cl-dot');
    const colorSliders = [document.querySelector('.cl-redcolor-slider'), document.querySelector('.cl-blackcolor-slider')];
    const textMain = document.querySelector('.cl-colortext-main');
    
    const textData = {
        'red': 'Đỏ Tình Vân',
        'black': 'Đen'
    };

    if (colorDots.length > 0 && textMain) {
        colorDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const selectedColor = dot.getAttribute('data-color'); 

                colorDots.forEach(d => d.classList.remove('active'));
                colorSliders.forEach(slider => {
                    if (slider) slider.classList.remove('active');
                });

                dot.classList.add('active');
                const activeSlider = document.querySelector(`.cl-${selectedColor}color-slider`);
                if (activeSlider) activeSlider.classList.add('active');

                textMain.innerHTML = textData[selectedColor];
            });
        });
    }

    const xtrueSection = document.getElementById('cl-xtrue-section');
    const xtrueVideo = document.querySelector('.cl-xtrue-video');
    const xtrueStats = document.querySelector('.cl-xtrue-stats');

    if (xtrueSection && xtrueVideo && xtrueStats) {
        
        const textObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    xtrueSection.classList.add('cl-inview'); 
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 }); 
        textObserver.observe(xtrueSection);

        let delayTimer;
        let stopTimer;

        const mediaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    clearTimeout(delayTimer);
                    clearTimeout(stopTimer);
                    xtrueVideo.pause();
                    xtrueVideo.currentTime = 0;
                    xtrueSection.classList.remove('cl-lower-active'); 

                    delayTimer = setTimeout(() => {
                        let playPromise = xtrueVideo.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(error => console.log("Video chờ tải:", error));
                        }                     
                        xtrueSection.classList.add('cl-lower-active');    

                        stopTimer = setTimeout(() => {
                            xtrueVideo.pause();
                        }, 1000); 

                    }, 500);

                } else {
                    clearTimeout(delayTimer);
                    clearTimeout(stopTimer);
                    xtrueVideo.pause();
                    xtrueVideo.currentTime = 0;
                    xtrueSection.classList.remove('cl-lower-active');
                }
            });
        }, { threshold: 0.3 }); 
        
        mediaObserver.observe(xtrueStats);
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        
        gsap.registerPlugin(ScrollTrigger);

        const perspectives = document.querySelectorAll('.cl-camera-perspective');
        
        perspectives.forEach(perspective => {
            const fold = perspective.querySelector('.cl-camera-fold');
            if (fold) {
                gsap.fromTo(fold,
                    { 
                        rotationX: -45, 
                        y: 150,         
                        opacity: 0,     
                        scale: 0.9      
                    },
                    {
                        rotationX: 0,   
                        y: 0,           
                        opacity: 1,     
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: perspective, 
                            start: "top bottom", 
                            end: "top 15%",      
                            scrub: 1             
                        }
                    }
                );
            }
        });
        
        gsap.utils.toArray('.cl-reveal-item').forEach((el) => {
            gsap.fromTo(el, 
                { autoAlpha: 0, y: 200 }, 
                { 
                    autoAlpha: 1, 
                    y: 0, 
                    duration: 1.2, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el, 
                        start: "top 85%", 
                        once: true 
                    }
                }
            );
        });

        gsap.utils.toArray('.cl-zoom-target').forEach(img => {
            gsap.fromTo(img,
                { scale: 1.15 }, 
                {
                    scale: 1, 
                    ease: "none", 
                    scrollTrigger: {
                        trigger: img.parentElement, 
                        start: "top bottom", 
                        end: "bottom top", 
                        scrub: 1 
                    }
                }
            );
        });
    }

    const cameraUltra = document.querySelector('.cl-camera-ultra');

    if (cameraUltra) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cameraUltra.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });
        observer.observe(cameraUltra);
    }

    const showcaseSwiper = new Swiper('.cl-showcase-swiper', {
        effect: 'creative',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        loopedSlides: 3, 
        speed: 800,       
        creativeEffect: {
            limitProgress: 2,
            perspective: true,
            prev: {
                origin: 'right center',     
                translate: ['-110%', 0, -200], 
                rotate: [0, 50, 0],         
            },
            
            next: {
                origin: 'left center',      
                translate: ['110%', 0, -200],  
                rotate: [0, -50, 0],        
            }
        },
        navigation: {
            nextEl: '.cl-showcase-next',
            prevEl: '.cl-showcase-prev',
        }
    });

    const cameraMacro = document.querySelector('.cl-camera-macro');

    if (cameraMacro) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cameraMacro.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });
        observer.observe(cameraMacro);
    }

    const clSec1Data = {
        telephoto: {
            desc: "Nhờ vào Camera Telephoto Macro kết hợp cùng khẩu độ F2.2 tiên tiến, bạn có thể dễ dàng ghi lại toàn bộ khung cảnh trước mắt với độ chi tiết cuốn hút, từ những bức ảnh cận sắc nét cho đến những khung cảnh ở phía xa.",
            imgLeft: "./camera/huawei-mate-x7-telephoto-photo-graphy-sample-01-2x.webp",
            labelLeft: "1x",
            imgRight: "./camera/huawei-mate-x7-telephoto-photo-graphy-sample-02-2x.webp",
            labelRight: "10x"
        },
        macro: {
            imgLeft: "./camera/huawei-mate-x7-marco-photo-graphy-sample-01-2x.webp", 
            labelLeft: "Macro",
            imgRight: "./camera/huawei-mate-x7-marco-photo-graphy-sample-02-2x.webp",
            labelRight: "Macro"
        }
    };

    const clSec2Data = {
        linhhoat: {
            desc: "Điều chỉnh góc độ và rảnh tay tự do chụp ảnh với khung hình của riêng bạn.",
            imgLeft: "./camera/huawei-mate-x7-flex-stop-photo-graphy-01-2x.webp",
            imgRight: "./camera/huawei-mate-x7-flex-stop-photo-graphy-02-2x.webp"
        },
        selfie: {
            desc: "Xem trước việc tạo dáng của bạn trên màn hình ngoài và tận dụng toàn bộ sức mạnh từ nhiều ống kính để có bức ảnh selfie hoàn hảo nhất.",
            imgLeft: "./camera/huawei-mate-x7-rear-camera-selfie-01-2x.webp", 
            imgRight: "./camera/huawei-mate-x7-rear-camera-selfie-02-2x.webp" 
        }
    };

    function clMoveIndicator(button, indicatorId) {
        const indicator = document.getElementById(indicatorId);
        if (indicator && button) {
            indicator.style.width = `${button.offsetWidth}px`;
            indicator.style.left = `${button.offsetLeft}px`;
        }
    }

    function clSetupTabs(buttonsClass, dataObj, indicatorId, updateContentCallback) {
        const buttons = document.querySelectorAll(buttonsClass);
        if (buttons.length === 0) return;
        
        setTimeout(() => clMoveIndicator(buttons[0], indicatorId), 100);
        
        window.addEventListener('resize', () => {
            const activeBtn = document.querySelector(`${buttonsClass}.cl-active`);
            if (activeBtn) clMoveIndicator(activeBtn, indicatorId);
        });

        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('cl-active')) return; 

                buttons.forEach(b => b.classList.remove('cl-active'));
                this.classList.add('cl-active');

                clMoveIndicator(this, indicatorId);

                const targetKey = this.getAttribute('data-target');
                updateContentCallback(dataObj[targetKey]);
            });
        });
    }

    const clS1LeftContent = document.getElementById('cl-sec1-left-content');
    const clS1RightContent = document.getElementById('cl-sec1-right-content');
    
    if (clS1LeftContent && clS1RightContent) {
        clSetupTabs('.cl-sec1-btn', clSec1Data, 'cl-sec1-indicator', (data) => {
            clS1LeftContent.classList.add('cl-fade-out');
            clS1RightContent.classList.add('cl-fade-out');
            
            setTimeout(() => {
                document.getElementById('cl-sec1-img-left').src = data.imgLeft;
                document.getElementById('cl-sec1-label-left').innerText = data.labelLeft;
                document.getElementById('cl-sec1-img-right').src = data.imgRight;
                document.getElementById('cl-sec1-label-right').innerText = data.labelRight;
                
                clS1LeftContent.classList.remove('cl-fade-out');
                clS1RightContent.classList.remove('cl-fade-out');
            }, 300);
        });
    }

    const clS2Images = document.getElementById('cl-sec2-images');
    const clS2Desc = document.getElementById('cl-sec2-desc');

    if (clS2Images && clS2Desc) {
        clSetupTabs('.cl-sec2-btn', clSec2Data, 'cl-sec2-indicator', (data) => {
            clS2Images.classList.add('cl-fade-out');
            clS2Desc.classList.add('cl-fade-out');

            setTimeout(() => {
                document.getElementById('cl-sec2-desc').innerText = data.desc;
                document.getElementById('cl-sec2-img-left').src = data.imgLeft;
                document.getElementById('cl-sec2-img-right').src = data.imgRight;
                
                clS2Images.classList.remove('cl-fade-out');
                clS2Desc.classList.remove('cl-fade-out');
            }, 300);
        });
    }

    const multiAngle = document.querySelector('.cl-multi-angle-title');

    if (multiAngle) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    multiAngle.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });
        observer.observe(multiAngle);
    }

    const videoUltra = document.querySelector('.cl-video-ultra');

    if (videoUltra) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoUltra.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });
        observer.observe(videoUltra);
    }

    function toggleFullscreen() {
        const container = document.querySelector('.cl-video-container');

        if (!document.fullscreenElement &&    
            !document.webkitFullscreenElement && 
            !document.msFullscreenElement) {
            
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) { 
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) { 
                container.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    const revealElements = document.querySelectorAll('.cl-reveal-up');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.15 }); 

        revealElements.forEach(el => revealObserver.observe(el));
    }

    const foldTop = document.querySelector('.cl-fold-top');
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2 
    });

    if (foldTop) {
        scrollObserver.observe(foldTop);
    }

    const layerVideo = document.getElementById("cl-layer-video");
    const layerLabels = document.querySelector(".cl-layer-labels");
    
    const shieldVideo = document.getElementById("cl-shield-video");
    const shieldText = document.getElementById("cl-shield-text");

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.play().catch(e => console.log("Trình duyệt chặn autoplay:", e));
            } else {
            }
        });
    }, { 
        threshold: 0.5 
    });

    if (layerVideo && layerLabels) {
        videoObserver.observe(layerVideo);

        layerVideo.addEventListener("ended", () => {
            layerLabels.classList.add("is-visible");
        });

        layerVideo.addEventListener("play", () => {
            if (layerVideo.currentTime === 0) {
                layerLabels.classList.remove("is-visible");
            }
        });
    }

    if (shieldVideo && shieldText) {
        videoObserver.observe(shieldVideo);

        shieldVideo.addEventListener("ended", () => {
            shieldText.classList.add("is-visible");
        });

        shieldVideo.addEventListener("play", () => {
            if (shieldVideo.currentTime === 0) {
                shieldText.classList.remove("is-visible");
            }
        });
    }

    const waterSwiper = new Swiper('.cl-water-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 700,
        grabCursor: true,
        navigation: {
            nextEl: '.cl-water-next',
            prevEl: '.cl-water-prev',
        },
        on: {
            slideChange: function () {
                const video = document.getElementById('cl-water-video');
                const playIcon = document.getElementById('cl-icon-play');
                const pauseIcon = document.getElementById('cl-icon-pause');
                
                if (this.activeIndex === 0) {
                    if (video) {
                        video.play();
                        if(playIcon && pauseIcon) {
                            playIcon.classList.add('cl-hidden');
                            pauseIcon.classList.remove('cl-hidden');
                        }
                    }
                } else {
                    if (video) video.pause();
                }
            }
        }
    });
    
    const waterVideo = document.getElementById('cl-water-video');
    const waterPlayPauseBtn = document.getElementById('cl-water-playpause');
    const waterIconPlay = document.getElementById('cl-icon-play');
    const waterIconPause = document.getElementById('cl-icon-pause');

    if (waterVideo && waterPlayPauseBtn) {
        waterPlayPauseBtn.addEventListener('click', () => {
            if (waterVideo.paused) {
                waterVideo.play();
                waterIconPlay.classList.add('cl-hidden');
                waterIconPause.classList.remove('cl-hidden');
            } else {
                waterVideo.pause();
                waterIconPause.classList.add('cl-hidden');
                waterIconPlay.classList.remove('cl-hidden');
            }
        });
    }

    const advantageTexts = document.querySelectorAll('.cl-advantages h3, .cl-advantages .cl-grey-sub');

    if (advantageTexts.length > 0) {
        const advObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); 
                }
            });
        }, { 
            threshold: 0.2 
        });
        advantageTexts.forEach(el => advObserver.observe(el));
    }

    const aiTitle = document.querySelector('.cl-ai-title');
    if (aiTitle) {
        const aiTitleObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aiTitle.classList.add('in-view');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.3 }); 
        
        aiTitleObserver.observe(aiTitle);
    }

    const aiTabs = document.querySelectorAll('.cl-ai-tab');
    const aiMockupImg = document.getElementById('cl-ai-mockup-img');
    const aiMainImg = document.getElementById('cl-ai-main-img');

    const aiData = [
        {
            mockup: "./display/huawei-mate-x7-ai-photo-01-01-2x.webp", 
            main: "./display/huawei-mate-x7-ai-photo-01-02-2x.webp"
        },
        {
            mockup: "./display/huawei-mate-x7-ai-photo-02-01-2x.webp",
            main: "./display/huawei-mate-x7-ai-photo-02-02-2x.webp"
        }
    ];

    if (aiTabs.length > 0 && aiMockupImg && aiMainImg) {
        aiTabs.forEach((tab) => {
            tab.addEventListener('click', function() {
                if (this.classList.contains('cl-ai-tab-active')) return;

                aiTabs.forEach(t => {
                    t.classList.remove('cl-ai-tab-active');
                    t.classList.add('cl-ai-tab-inactive');
                });

                this.classList.remove('cl-ai-tab-inactive');
                this.classList.add('cl-ai-tab-active');

                const index = this.getAttribute('data-index');

                aiMockupImg.style.opacity = 0;
                aiMainImg.style.opacity = 0;

                setTimeout(() => {
                    aiMockupImg.src = aiData[index].mockup;
                    aiMainImg.src = aiData[index].main;
                    
                    aiMockupImg.style.opacity = 1;
                    aiMainImg.style.opacity = 1;
                }, 300);
            });
        });
    }

    const commTitle = document.querySelector('.cl-comm-title');
    if (commTitle) {
        const commTitleObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    commTitle.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }); 

        commTitleObserver.observe(commTitle);
    }

    const commSwiper = new Swiper('.cl-comm-swiper', {
        slidesPerView: 1,
        spaceBetween: 40,
        effect: 'slide',
        speed: 700,
        loop: false, 
        grabCursor: true,
        navigation: {
            nextEl: '.cl-comm-next',
            prevEl: '.cl-comm-prev',
        }
    });

    const backToTopBtn = document.getElementById('cl-back-to-top');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (typeof ScrollTrigger !== 'undefined') {
        const resizeObserver = new ResizeObserver(() => {
            ScrollTrigger.refresh();
        });
        resizeObserver.observe(document.body);
    }
});