const nevInput=document.querySelector("#nev")
const emailInput=document.querySelector("#email")
const jelszoEgyInput=document.querySelector("#jelszoEgy")
const jelszoKettoInput=document.querySelector("#jelszoKetto")
const visszajelzoUzenet=document.querySelector("#visszajelzoUzenet")

// Karakter megszámoló
document.querySelector("#nev").addEventListener("input",KarakterSzamlalo)
function KarakterSzamlalo(){
    let karakterHossz=nevInput.value.length
    
    document.querySelector("#karakterSzamlalo").innerHTML=`${karakterHossz} (karakter)`
}

// E-mail validáció
function EmailValidation(email){
    let minta=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if(minta.test(email)){
        return true
    }
    return false
}

// Jelszó validáció
function JelszoValidation(jelszo){
    let minta=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

    if(minta.test(jelszo)){
        return true
    }
    return false
}


// Jelszó megjelenítő/eltüntető
document.querySelector("#jelszoAllapotGomb").addEventListener("click",JelszoAllapot)
function JelszoAllapot(){
    let allapot=jelszoEgyInput.getAttribute("type")
    if(allapot=="password"){
        jelszoEgyInput.setAttribute("type","text")
        document.querySelector("#jelszoAllapotGomb").innerHTML=`Jelszó elrejtése`
        document.querySelector("#jelszoAllapotGomb").classList.remove("btn-danger")
        document.querySelector("#jelszoAllapotGomb").classList.add("btn-warning")
    }
    else{
        jelszoEgyInput.setAttribute("type","password")
        document.querySelector("#jelszoAllapotGomb").innerHTML=`Jelszó megjelenítése`
        document.querySelector("#jelszoAllapotGomb").classList.remove("btn-warning")
        document.querySelector("#jelszoAllapotGomb").classList.add("btn-danger")
    }
}


// Űrlap validáció
document.querySelector("#form").addEventListener("submit",(event)=>{
    event.preventDefault()

    let uzenet=""
    let nev=document.querySelector("#nev").value
    let emailCim=document.querySelector("#email").value
    let jelszoEgy=document.querySelector("#jelszoEgy").value
    let jelszoKetto=document.querySelector("#jelszoKetto").value

    if(nev==""){
        uzenet=`Üres név mező!`
        visszajelzoUzenet.style.color="rgb(183, 18, 18)"
    }
    else if(emailCim==""){
        uzenet=`Üres e-mail cím mező`
        visszajelzoUzenet.style.color="rgb(183, 18, 18)"
    }
    else if(jelszoEgy==""){
        uzenet=`Üres jelszó mező!`
        visszajelzoUzenet.style.color="rgb(183, 18, 18)"
    }
    else if(jelszoKetto==""){
        uzenet=`Üres jelszó megerősítése mező!`
        visszajelzoUzenet.style.color="rgb(183, 18, 18)"
    }
    else if(!EmailValidation(emailCim)){
        uzenet=`Hibás e-mail cím formátumot adott meg!`
        visszajelzoUzenet.style.color="rgb(183, 18, 18)"
    }
    else if(!JelszoValidation(jelszoEgy)){
        uzenet=`Nem megfelelő jelszó formátum! (Min. 8 karakter hosszú, valamint tartalmazzon legalább egy kis-és nagybetűt valamint számot.)`
        visszajelzoUzenet.style.color="rgb(183, 18, 18)"
    }
    else if(jelszoEgy!==jelszoKetto){
        uzenet=`Jelszó mezők nem egyeznek meg!`
        visszajelzoUzenet.style.color="rgb(183, 18, 18)"
    }
    else{
        uzenet=`Sikeres regisztráció!`
        visszajelzoUzenet.style.color="green"
        document.querySelector("#nev").value=""
        document.querySelector("#email").value=""
        document.querySelector("#jelszoEgy").value=""
        document.querySelector("#jelszoKetto").value=""
        document.querySelector("#karakterSzamlalo").innerHTML=`0 (karakter)`
    }

    visszajelzoUzenet.innerHTML=uzenet
})