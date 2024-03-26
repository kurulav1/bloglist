import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';
import { useEffect } from 'react';
import {
    fetchBlogStart,
    fetchBlogSuccess,
    fetchBlogFailure
} from '../reducers/currentBlogSlice';

const BlogDetailView = () => {
    const dispatch = useDispatch();
    const blog = useSelector(state => state.currentBlog.blog);
    const status = useSelector(state => state.currentBlog.status);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                dispatch(fetchBlogStart());
                const fetchedBlog = await blogService.getSingle(id);
                dispatch(fetchBlogSuccess(fetchedBlog));
            } catch (error) {
                dispatch(fetchBlogFailure(error.toString()));
            }
        };

        fetchBlog();
    }, [id, dispatch]);

    if (status === 'loading') return <div className="text-center mt-5">Loading...</div>;
    if (status === 'failed' || !blog) return <div className="alert alert-danger mt-5">Error loading blog details</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{blog.title}</h2>
            <div className="card">
                <div className="card-body">
                    <p className="card-text"><strong>Author:</strong> {blog.author}</p>
                    <p className="card-text"><strong>URL:</strong> <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
                    <p className="card-text"><strong>Likes:</strong> {blog.likes}</p>
                    <p className="card-text"><strong>Posted by:</strong> {blog.user.username}</p>
                </div>
            </div>
        </div>
    );
}

export default BlogDetailView;
