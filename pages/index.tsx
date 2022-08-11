import {GetStaticProps} from 'next';
import {Product, H} from '../components';
import {withLayout} from '../layout/Layout';
import axios from 'axios';
import {MenuItem} from '../interfaces/menu.interface';
import {API} from "../helpers/api";
import {Error404} from "./404";
import {ProductModel} from "../interfaces/product.interface";
import fs from 'fs';

function Home({products}: HomeProps): JSX.Element {

    if (!products) {
        return <Error404/>;
    }

    return (
        <>
            <H tag='h1'>Самые популярные курсы</H>
            <div role='list'>
                {products && products.map((product) => (
                    <Product key={product._id} product={product} role='listitem'/>
                ))}
            </div>
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;

    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory
    });

    if (menu.length === 0) {
        return {
            notFound: true
        };
    }

    const rawData = fs.readFileSync('./fake_data/mainProduct.json');
    const {products} = JSON.parse(rawData.toString());

    if (products.length === 0) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            menu,
            firstCategory,
            products
        }
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[],
    firstCategory: number,
    products: ProductModel[]
}