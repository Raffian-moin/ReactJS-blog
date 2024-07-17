import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { formats, modules } from './assets/ReactQuillCustomSetUp';

export default function BlogForm(props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    name="title"
                    className="form-control"
                    {...register('title', { required: true })}
                />
                {errors.title?.type === 'required' && (
                    <p>First name is required</p>
                )}
            </div>

            <div className="mb-3">
                <div className="mb-3">
                    <label className="form-label">Cover Image</label>
                    <input className="form-control" type="file" id="formFile" />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Content</label>
                <ReactQuill
                    theme="snow"
                    value={props.blogContent}
                    onChange={props.setBlogContent}
                    modules={modules}
                    formats={formats}
                />
            </div>

            <div>
                <input type="submit" />
            </div>
        </form>
    );
}
