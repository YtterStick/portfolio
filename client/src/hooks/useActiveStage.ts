import { useEffect, useState } from 'react';
import { MISSION_STAGES } from '../data/missionData';

export function useActiveStage(): string {
  const [activeStage, setActiveStage] = useState<string>(MISSION_STAGES[0].id);

  useEffect(() => {
    const updateFromScroll = () => {
      const probeY = window.innerHeight * 0.36;
      let current = MISSION_STAGES[0].id;

      for (const stage of MISSION_STAGES) {
        const el = document.getElementById(stage.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = stage.id;
        }
      }
      setActiveStage(current);
    };

    updateFromScroll();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);
    return () => {
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
    };
  }, []);

  return activeStage;
}
