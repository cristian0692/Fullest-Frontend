import explodeParticle1 from "../../resources/assets/explosionParticle1.png";
import explodeParticle2 from "../../resources/assets/explosionParticle2.png";

type Props = {
  particle1: React.RefObject<null>;
  particle2: React.RefObject<null>;
  particle3: React.RefObject<null>;
};
const angles = [-40, 40, 10]; // degrees

const ExplosionParticles = ({ particle1, particle2, particle3 }: Props) => {
  return (
    <div className="w-20 h-4 relative z-1">
      <img
        className="absolute lg:right-0 sm:right-13 right-20 sm:top-0 top-8 w-auto lg:h-5 sm:h-4 h-3"
        style={{
          transform: `rotate(${angles[0]}deg)`,
        }}
        ref={particle2}
        src={explodeParticle1}
      />
      <img
        className="absolute lg:right-0 sm:right-13 right-20 sm:top-0 -top-3 w-auto lg:h-5 sm:h-4 h-3"
        style={{
          transform: `rotate(${angles[1]}deg)`,
        }}
        ref={particle1}
        src={explodeParticle2}
      />

      <img
        className="absolute lg:right-0 sm:right-10 right-20 sm:top-0 top-0 w-auto lg:h-5 sm:h-4 h-2.5"
        style={{
          transform: `rotate(${angles[2]}deg)`,
        }}
        ref={particle3}
        src={explodeParticle2}
      />
    </div>
  );
};

export default ExplosionParticles;
