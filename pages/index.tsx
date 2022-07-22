import { useState } from 'react';
import { H, Button, P, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {

  const [rating, setRating] = useState<number>(4);

  return (
    <div>
      <H tag='h1' title='123123'>Hello!</H>
      <Button apperance='primary'>button</Button>
      <Button apperance='ghost' arrow='down'>button with arrow</Button>
      <P size='s'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora perspiciatis neque velit earum qui iure voluptates molestias quam omnis aliquam, et eaque. Totam consequatur, quisquam at non possimus eius velit!</P>
      <P size='l'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora perspiciatis neque velit earum qui iure voluptates molestias quam omnis aliquam, et eaque. Totam consequatur, quisquam at non possimus eius velit!</P>
      <Tag size='m' color='green' href='http://localhost:3000/' target='_blank'>Tag</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
    </div>
  );
}

export default withLayout(Home);