import { useState } from 'react'
import { onRegistration, onLogin } from '../api/auth'
import Layout from '../components/layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice'

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        username: '',
    })
const [error, setError] = useState(false)
const [success, setSuccess] = useState(false)

const onChange = (e) => {
setValues({...values,[e.target.name]: e.target.value})
}

const dispatch = useDispatch()
const onSubmit = async (e) => {
    e.preventDefault()

    try {
        const { data } = await onRegistration(values)

        setError('')
        setSuccess(data.message)
        setValues({ email: '', password: '' })

        await onLogin(values)
        dispatch(authenticateUser())

        localStorage.setItem('isAuth', 'true')
    } catch (err) {
        console.log(err.response.data.errors[0].msg)
        setError(err.response.data.errors[0].msg)
    }
}

    return (
        <Layout>
            <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
                <h1>Register</h1>

                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                        Email address
                    </label>
                    <input
                        onChange={(e) => onChange(e)}
                        type = 'email'
                        className = 'form-control'
                        id = 'email'
                        name = 'email'
                        value = {values.email}
                        placeholder = 'test@gmail.com'
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input 
                        onChange={(e) => onChange(e)}
                        type="password"
                        value={values.password}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="password"
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='username' className='form-label'>
                        Username
                    </label>
                    <input 
                        onChange={(e) => onChange(e)}
                        type="username"
                        value={values.username}
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="username"
                        required
                    />
                </div>

                <div style={{color:'red', margin: '10px 0'}}>{error}</div>
                <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </Layout>
    )
}

export default Register