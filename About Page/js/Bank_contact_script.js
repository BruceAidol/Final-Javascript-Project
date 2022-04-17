const accordian = document.querySelector('.accordian');

const accordContentFunc = (activeResult,accordContent) => {
    (activeResult)? accordContent.style.display = 'block' : accordContent.style.display = 'none';
}

const activeFunction = e => {
    e.preventDefault();
    let accordRowParent, accordRowClass, accordTitleClass, activeResult1, activeResult2, activeResult;
    const activeFunction = () => {
        const accordTitle = accordRowParent.querySelector('.accord-title');
        const accordContent = accordRowParent.querySelector('.accord-content');

        accordRowClass = accordRowParent.classList;
        accordTitleClass = accordTitle.classList;
   
        activeResult1 = accordRowClass.toggle('active'); 
        activeResult2 = accordTitleClass.toggle('active'); 
        activeResult = (activeResult1 && activeResult2)? true : false;
        accordContentFunc(activeResult,accordContent);
    }
    if(e.target.classList.contains('accord-title')){
        accordRowParent = e.target.parentElement;
        activeFunction();
    }
    else if (e.target.classList.contains('blue-title')){
        let accordTitleParent = e.target.parentElement;
        accordRowParent = accordTitleParent.parentElement;
        activeFunction();
    }
}

accordian.addEventListener("click", e => activeFunction(e) );