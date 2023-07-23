import { Button } from "./LoadMoreButton.styled";
import PropTypes from 'prop-types';

export default function LoadMoreButton({ onClick }) {
    return <Button onClick={onClick}>Load more</Button>;
}

LoadMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired
};