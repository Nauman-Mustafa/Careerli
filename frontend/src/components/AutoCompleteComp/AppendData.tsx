export const appendText = (autoCompletionText: any) => {

    let elem: any = document.querySelector('.jodit-wysiwyg>p');
    if(!elem)
    elem = document.querySelector('.jodit-wysiwyg>ul');
    if(!elem)
    elem = document.querySelector('.jodit-wysiwyg>ol');
    console.log(autoCompletionText, "autoCompletion" ,elem)
    const childElem = document.createElement('span');
    childElem.innerText =  autoCompletionText + "...";
    childElem.id = "text-append"
    childElem.style.color = "lightgrey"
        elem?.append(childElem)
};