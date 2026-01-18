import style from './CameraIcon.module.css'

export default function CameraIcon() {
    return (
        <div className={style.homeContent}>
            <svg className={style.icon} width={100} height={100}>
                <use href="/src/images/sprite.svg#icon-video-camera"></use>
            </svg>
            <h1 className={style.homeTitle}>
                Find your favorite movies here
            </h1>
        </div>
    )
}