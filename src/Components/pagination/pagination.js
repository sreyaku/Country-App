import React from 'react';
import './pagination.css';

function Pagination(props) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            <nav>
                <ul className='page-number-ul'>
                    {
                        pageNumbers.map(number => {
                            return (
                                    <li className='page-number-li' key={number}>
                                        <a className='page-number' onClick={()=>props.paginate(number)} href='#'>{number}</a>
                                    </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Pagination