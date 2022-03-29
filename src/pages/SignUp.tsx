import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import styles from './SignUp.module.css';


export default function App() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => alert(data);
    console.log(errors);

    return (
        <div className={styles.container} >
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <FaGlobeEurope className={styles.icon} />
                <input className={styles.input} type="text" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                <div>
                    {errors.Email && <p className={styles.alert}>This field is required</p>}
                </div>
                <input className={styles.input} type="text" placeholder="Name" {...register("Name", { required: true })} />
                <div>
                    {errors.Name && <p className={styles.alert}>This field is required</p>}
                </div>

                <input className={styles.input} type="password" placeholder="Password" {...register("Password", { required: true, min: 3 })} />
                <div>
                    {errors.Password && <p className={styles.alert}>This field is required</p>}
                </div>

                <input className={styles.input} type="password" placeholder="Repeat Password" {...register("RepeatPassword", { required: true, min: 3 })} />
                <div>
                    {errors.RepeatPassword && <p className={styles.alert}>This field is required</p>}
                </div>

                <input className={styles.button} type="submit" value='register' />
            </form>
        </div>
    );
}