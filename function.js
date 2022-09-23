let myLeads = []
let keywords = []
const inputEl = document.getElementById("input-el")
const inputEl2 = document.getElementById("input-el2")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const ulEl2 = document.getElementById("ul-el2")
const deleteBtn = document.getElementById("delete-btn")
const deleteAllBtn = document.getElementById("deleteAll-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const keywordsFromLocalStorage = JSON.parse( localStorage.getItem("keywords") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    keywords = keywordsFromLocalStorage
    render(myLeads)
    render2(keywords)
}
//save tab
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        if(inputEl2.value.length == 0){
            keywords.push("Empty")
        }
        else{
            keywords.push(inputEl2.value)
        }
        inputEl2.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        localStorage.setItem("keywords", JSON.stringify(keywords) )
        render(myLeads)
        render2(keywords)

    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
function render2(leads) {
    let news = ""
    for (let i = 0; i < leads.length; i++) {
        news += `
            <li>
                ${leads[i]}
            </li>
        `
    }
    ulEl2.innerHTML = news
}

//delete all
deleteAllBtn.addEventListener("click", function() {
        localStorage.clear()
        myLeads = []
        keywords = []
        render(myLeads)
        render2(keywords)
})
//delete one
deleteBtn.addEventListener("click", function() {
    localStorage.removeItem("myLeads", JSON.stringify(myLeads) )
    localStorage.removeItem("keywords", JSON.stringify(keywords) )
    myLeads.pop()
    keywords.pop()
    render(myLeads)
    render2(keywords)
})

//input Tab
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    keywords.push(inputEl2.value)
    inputEl.value = ""
    inputEl2.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    localStorage.setItem("keywords", JSON.stringify(keywords) )
    render(myLeads)
    render2(keywords)
})