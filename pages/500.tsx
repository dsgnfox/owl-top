import {H, P} from '../components';
import {withLayout} from '../layout/Layout';
import Link from "next/link";

function Error500(): JSX.Element {
    return (
        <>
            <H tag='h1'>Ошибка 500</H>
            <P size='m'>Что-то пошло не так</P>
            <Link href='/'>
                <a aria-label='Вернуться на главную страницу'>Вернуться на главную страницу</a>
            </Link>
        </>
    );
}

export default withLayout(Error500);