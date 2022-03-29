import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ReviewItem } from '../ReviewItem';
import { Pagination } from '../Pagination';
import * as Styled from './styled';

interface IReviewListProps {
  reviews: {
    reviewId: number;
    author: string;
    authorImg: string;
    rating: number;
    date: string;
    content: string;
    reviewImg: string;
  }[];
}

export function ReviewList({ reviews }: IReviewListProps) {
  const itemsPerPage = 5;
  const [pageNum, setPageNum] = useState(1);
  const offset = (pageNum - 1) * itemsPerPage;

  return (
    <>
      <Styled.ReviewList>
        <ul>
          {reviews.slice(offset, offset + itemsPerPage).map((review) => (
            <ReviewItem key={nanoid()} {...review} />
          ))}
        </ul>
      </Styled.ReviewList>
      <Pagination
        totalItemCount={reviews.length}
        itemsPerPage={itemsPerPage}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    </>
  );
}
