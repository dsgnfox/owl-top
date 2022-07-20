import { Htag } from '../components';
import { Button } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Hello!</Htag>
      <Button apperance='primary'>button</Button>
      <Button apperance='ghost' arrow='down'>button with arrow</Button>
    </div>
  );
}
