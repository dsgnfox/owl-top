import {GetStaticProps} from 'next';
import {withLayout} from '../layout/Layout';
import axios from 'axios';
import {MenuItem} from '../interfaces/menu.interface';
import {API} from "../helpers/api";

function Search(): JSX.Element {

    return (
        <div>
            Search page
        </div>
    );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory: 0
    });

    if (menu.length === 0) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            menu
        }
    };
};

interface SearchProps extends Record<string, unknown> {
    menu: MenuItem[]
}