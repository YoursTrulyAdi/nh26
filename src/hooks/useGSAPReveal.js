"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * A custom hook to automatically apply GSAP ScrollTrigger animations
 * to all elements with the .reveal class.
 */
export const useGSAPReveal = () => {
    useGSAP(() => {
        // Optimize ScrollTrigger config for performance
        ScrollTrigger.config({
            limitCallbacks: true,
            ignoreMobileResize: true
        });

        const revealElements = gsap.utils.toArray(".reveal");
        const staggerContainers = gsap.utils.toArray(".reveal-container");

        const getAnimParams = (el, isStagger = false) => {
            let props = {
                y: 20,
                scale: 0.98,
                duration: 1,
                ease: "expo.out",
                autoAlpha: 0,
            };

            if (el.classList.contains("reveal-left")) {
                props.x = -40;
                props.y = 0;
            } else if (el.classList.contains("reveal-right")) {
                props.x = 40;
                props.y = 0;
            } else if (el.classList.contains("reveal-zoom")) {
                props.scale = 0.9;
                props.y = 0;
            }
            
            if (el.classList.contains("reveal-no-scale")) {
                props.scale = undefined;
            }

            return props;
        };

        // 1. Handle Individual Reveals
        revealElements.forEach((el) => {
            // Skip if this is also a reveal-container (handled below to avoid double-animation)
            if (el.classList.contains("reveal-container")) return;

            const animationProps = getAnimParams(el);
            
            const fromVars = { autoAlpha: 0, y: animationProps.y || 0 };
            if (animationProps.x !== undefined) fromVars.x = animationProps.x;
            if (animationProps.scale !== undefined) fromVars.scale = animationProps.scale;

            const toVars = {
                autoAlpha: 1,
                y: 0,
                x: 0,
                duration: animationProps.duration,
                ease: animationProps.ease,
                clearProps: "transform,scale",
                scrollTrigger: {
                    trigger: el,
                    start: el.classList.contains("reveal-early") ? "top 98%" : "top 92%",
                    toggleActions: "play none none none",
                    once: true,
                },
            };
            if (animationProps.scale !== undefined) toVars.scale = 1;

            gsap.fromTo(el, fromVars, toVars);
        });

        // 2. Handle Stagger Containers
        staggerContainers.forEach((container) => {
            let children = container.querySelectorAll(".reveal-item");
            if (children.length === 0) {
                children = Array.from(container.children).filter(child =>
                    !["SCRIPT", "STYLE", "LINK"].includes(child.tagName)
                );
            }

            if (children.length > 0) {
                const animationProps = getAnimParams(container, true);
                
                const fromVars = { autoAlpha: 0, y: animationProps.y || 0 };
                if (animationProps.x !== undefined) fromVars.x = animationProps.x;
                if (animationProps.scale !== undefined) fromVars.scale = animationProps.scale;

                const toVars = {
                    autoAlpha: 1,
                    y: 0,
                    x: 0,
                    duration: animationProps.duration,
                    ease: animationProps.ease,
                    stagger: 0.15,
                    clearProps: "transform,scale",
                    scrollTrigger: {
                        trigger: container,
                        start: container.classList.contains("reveal-early") ? "top 98%" : "top 92%",
                        toggleActions: "play none none none",
                        once: true,
                    },
                };
                if (animationProps.scale !== undefined) toVars.scale = 1;

                gsap.fromTo(children, fromVars, toVars);
            }
        });

        // Initial refresh with a slight delay for hydration
        const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
        return () => clearTimeout(timer);
    }, []);
};
