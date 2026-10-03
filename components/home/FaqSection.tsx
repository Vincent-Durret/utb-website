"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "Quelle est la durée de vie d'une terrasse en bois ?",
    a: "La durée de vie d'une terrasse en bois dépend du type de bois utilisé, de l'entretien régulier et des conditions environnementales, mais elle peut durer plus de 30 ans avec un bois de qualité comme l'Ipé ou le Cumaru.",
  },
  {
    q: "Quelles essences de bois choisir pour une terrasse ?",
    a: "Les bois exotiques tels que le Cumaru, l'Itauba et l'Ipé sont souvent recommandés pour leur durabilité et leur résistance. Nous utilisons des essences issues de forêts gérées durablement au Brésil.",
  },
  {
    q: "Est-il possible de faire une terrasse sur un terrain en pente ?",
    a: "Oui, la terrasse en bois sur pilotis permet d'installer une terrasse sur un sol en pente en utilisant des techniques appropriées. Une terrasse sur pilotis est construite comme une charpente reposant sur des poteaux.",
  },
  {
    q: "Une terrasse en bois peut-elle entourer une piscine ?",
    a: "Oui, les terrasses en bois sont idéales pour épouser les contours de votre piscine et créer une plage pour la détente. Si votre piscine fonctionne au chlore, il peut y avoir quelques traces blanchâtres qui disparaissent très rapidement.",
  },
  {
    q: "Quelle est la différence entre bois naturel et composite ?",
    a: "Une terrasse en bois est entièrement composée de bois naturel, tandis qu'une terrasse en composite est un mélange de poussière de bois et de colle plastique. Le bois naturel est plus esthétique et écologique.",
  },
  {
    q: "Comment entretenir une terrasse en bois ?",
    a: "L'entretien comprend un nettoyage régulier, l'application d'un saturateur et la vérification des éventuels dommages. L'application d'un saturateur est fortement conseillée — le bois est un matériau vivant qu'il faut nourrir.",
  },
  {
    q: "Puis-je rénover une terrasse en bois existante ?",
    a: "Oui, une terrasse existante peut être rénovée en nettoyant, ponçant et appliquant une nouvelle finition. Il est également possible de dégriser la terrasse pour retrouver la teinte initiale du bois.",
  },
  {
    q: "Combien coûte une terrasse en bois ?",
    a: "Les coûts varient en fonction de plusieurs facteurs : la taille de la terrasse, le type de bois utilisé et la complexité de la construction. Contactez-nous pour demander un devis gratuit personnalisé.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const answersRef = useRef<(HTMLElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const toggle = (i: number) => {
    const prevOpen = open;
    setOpen(open === i ? null : i);

    if (reducedMotion) return;

    if (prevOpen !== null && answersRef.current[prevOpen]) {
      gsap.to(answersRef.current[prevOpen], { height: 0, duration: 0.3, ease: "power2.inOut" });
    }
    if (open !== i && answersRef.current[i]) {
      gsap.fromTo(
        answersRef.current[i],
        { height: 0 },
        { height: "auto", duration: 0.35, ease: "power2.inOut" }
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-creme py-20"
      style={reducedMotion ? undefined : { opacity: 0 }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="label-upper text-brun text-[9px] mb-3" aria-hidden="true">Questions fréquentes</div>
          <h2 className="text-noir-bois">FAQ</h2>
          <div className="dore-line mx-auto mt-4" aria-hidden="true" />
        </div>

        <dl className="flex flex-col gap-2">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            const answerId = `faq-answer-${i}`;
            const buttonId = `faq-btn-${i}`;

            return (
              <div
                key={i}
                className={`border transition-colors ${
                  isOpen ? "border-dore bg-beige" : "border-beige-card bg-white"
                }`}
              >
                <dt>
                  <button
                    id={buttonId}
                    className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="text-noir-bois pr-4">{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className={`text-dore text-xl leading-none flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </dt>

                <dd
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  ref={(el) => { answersRef.current[i] = el; }}
                  className="overflow-hidden"
                  style={{ height: reducedMotion ? (isOpen ? "auto" : 0) : 0 }}
                >
                  <p className="px-5 pb-4 text-muted">{faq.a}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
