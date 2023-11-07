import CircleGraph from '../CircleGraph';
import StScore from './StScore';
import StScoresContainer from './StScoresContainer';

interface ScoreProps {
  socialScore: number;
  environmentalScore: number;
  governanceScore: number;
  averageScore: number;
}

const ProviderScores = ({
  socialScore,
  environmentalScore,
  governanceScore,
  averageScore,
}: ScoreProps) => {
  return (
    <StScoresContainer>
      <StScore>
        <span>Score Social</span>
        <CircleGraph endScore={socialScore} colorType="primary" />
      </StScore>
      <StScore>
        <span>Score Ambiental</span>
        <CircleGraph endScore={environmentalScore} colorType="primary" />
      </StScore>
      <StScore>
        <span>Score de Gobernanza</span>
        <CircleGraph endScore={governanceScore} colorType="primary" />
      </StScore>
      <StScore>
        <span>Score Promedio</span>
        <CircleGraph endScore={averageScore} colorType="secondary" />
      </StScore>
    </StScoresContainer>
  );
};

export default ProviderScores;
