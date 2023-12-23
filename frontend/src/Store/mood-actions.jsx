const setThemeMood=(darkMode)=>{
    return(dispatch)=>{
        if(darkMode){
            document.documentElement.style.setProperty('--golden','#EFA51E')
            document.documentElement.style.setProperty('--font_color','rgb(180,180,180)')
            document.documentElement.style.setProperty('--main_bg_color','#07090c')
            document.documentElement.style.setProperty('--dark_white','rgb(140, 140, 140)')
            document.documentElement.style.setProperty('--theme_color','rgb(8,8,8)')
            document.documentElement.style.setProperty('--off_white','rgb(3, 3, 3)')
            document.documentElement.style.setProperty('--circle_color','rgba(0, 110, 255,.55)')
        }
        else{
            document.documentElement.style.setProperty('--golden','#EFA51E')
            document.documentElement.style.setProperty('--font_color','black')
            document.documentElement.style.setProperty('--main_bg_color','white')
            document.documentElement.style.setProperty('--dark_white','rgb(129, 129, 129)')
            document.documentElement.style.setProperty('--theme_color','white')
            document.documentElement.style.setProperty('--off_white','rgb(246, 242, 255)')
            document.documentElement.style.setProperty('--circle_color','rgba(0, 110, 255, 0.863)')
        }

    }
}
export default setThemeMood;