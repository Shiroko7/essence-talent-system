import {
  TreeDeciduous,
  Flame,
  Mountain,
  Shield,
  Droplet,
  Wind,
  Beaker,
  Moon,
  Heart,
  EyeOff,
  HeartHandshake,
  Skull,
  FlaskConical,
  CloudLightning,
  Sparkles
} from 'lucide-react';
import { CultivationPathId } from '../../types/cultivation';

export const getCultivationPathIcon = (id: CultivationPathId, color: string, size = 20) => {
  const props = { size, style: { color } };
  const pathKey = id;
  switch (pathKey) {
    case 'wood': return <TreeDeciduous {...props} />;
    case 'fire': return <Flame {...props} />;
    case 'earth': return <Mountain {...props} />;
    case 'metal': return <Shield {...props} />;
    case 'water': return <Droplet {...props} />;
    case 'sky': return <Wind {...props} />;
    case 'alchemy': return <Beaker {...props} />;
    case 'lunar': return <Moon {...props} />;
    case 'love': return <Heart {...props} />;
    case 'shadow': return <EyeOff {...props} />;
    case 'providence': return <HeartHandshake {...props} />;
    case 'ruin': return <Skull {...props} />;
    case 'pestilence': return <FlaskConical {...props} />;
    case 'tempest': return <CloudLightning {...props} />;
    default: return <Sparkles {...props} />;
  }
};
