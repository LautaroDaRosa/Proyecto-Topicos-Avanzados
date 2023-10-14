import whiteBall from '../../../resources/white-ball.svg';
import blueBall from '../../../resources/blue-ball.svg';
import StBall from './StBall';

interface BallProps {
  width: number;
  height: number;
  color: string;
  type: string;
}
const Ball = ({ width, height, color, type }: BallProps) => (
  <StBall
    src={color === 'blue' ? blueBall : whiteBall}
    alt="Ball"
    width={width}
    height={height}
    type={type}
    color={color}
  />
);

export default Ball;
