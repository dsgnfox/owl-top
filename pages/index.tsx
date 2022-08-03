import {GetStaticProps} from 'next';
import {useState} from 'react';
import {H, Button, P, Tag, Rating, Input, Textarea} from '../components';
import {withLayout} from '../layout/Layout';
import axios from 'axios';
import {MenuItem} from '../interfaces/menu.interface';
import {API} from "../helpers/api";

function Home({menu}: HomeProps): JSX.Element {

    const [rating, setRating] = useState<number>(4);

    return (
        <div>
            <H tag='h1' title='123123'>Hello!</H>
            <Button apperance='primary'>button</Button>
            <Button apperance='ghost' arrow='down'>button with arrow</Button>
            <P size='s'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora perspiciatis neque velit earum
                qui iure voluptates molestias quam omnis aliquam, et eaque. Totam consequatur, quisquam at non possimus
                eius velit!</P>
            <P size='l'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora perspiciatis neque velit earum
                qui iure voluptates molestias quam omnis aliquam, et eaque. Totam consequatur, quisquam at non possimus
                eius velit!</P>
            <Tag size='m' color='green' href='http://localhost:3000/' target='_blank'>Tag</Tag>
            <Rating rating={rating} isEditable={true} setRating={setRating}/>
            <Input placeholder='123'/>
            <Textarea placeholder='www'/>
        </div>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;

    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory
    });

    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[],
    firstCategory: number
}