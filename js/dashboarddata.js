const dashboard_data = [
    {id: 15, from: "شیراز", to: "تهران", trip: "oneway", depart: 1672830000000},
    {id: 16, from: "تبریز", to: "اصفهان", trip: "return", depart: 1672830000000, return: 1673107200000},
    {id: 17, from: "اهواز", to: "رشت", trip: "oneway", depart: 1673107200000},
    {id: 18, from: "تهران", to: "مشهد", trip: "oneway", depart: 1672922700000},
    {id: 19, from: "زاهدان", to: "بوشهر", trip: "return", depart: 1672922700000, return: 1673256600000},
    {id: 20, from: "شیراز", to: "تهران", trip: "oneway", depart: 1673206200000},
    {id: 21, from: "تهران", to: "شیراز", trip: "return", depart: 1673206200000, return: 1673631000000},
    {id: 22, from: "رشت", to: "بندرعباس", trip: "oneway", depart: 1673256600000},
    {id: 23, from: "ساری", to: "تهران", trip: "oneway", depart: 1673361000000},
    {id: 24, from: "کردستان", to: "رشت", trip: "return", depart: 1673620200000, return: 1674120600000},
];


const from0 = document.querySelector("#from0");
const to0 = document.querySelector("#to0");
const trip0 = document.querySelector("#trip0");
const depart0 = document.querySelector("#depart0");
const return0 = document.querySelector("#return0");
const from1 = document.querySelector("#from1");
const to1 = document.querySelector("#to1");
const trip1 = document.querySelector("#trip1");
const depart1 = document.querySelector("#depart1");
const return1 = document.querySelector("#return1");
const from2 = document.querySelector("#from2");
const to2 = document.querySelector("#to2");
const trip2 = document.querySelector("#trip2");
const depart2 = document.querySelector("#depart2");
const return2 = document.querySelector("#return2");
const from3 = document.querySelector("#from3");
const to3 = document.querySelector("#to3");
const trip3 = document.querySelector("#trip3");
const depart3 = document.querySelector("#depart3");
const return3 = document.querySelector("#return3");
const from4 = document.querySelector("#from4");
const to4 = document.querySelector("#to4");
const trip4 = document.querySelector("#trip4");
const depart4 = document.querySelector("#depart4");
const return4 = document.querySelector("#return4");
const from5 = document.querySelector("#from5");
const to5 = document.querySelector("#to5");
const trip5 = document.querySelector("#trip5");
const depart5 = document.querySelector("#depart5");
const return5 = document.querySelector("#return5");
const from6 = document.querySelector("#from6");
const to6 = document.querySelector("#to6");
const trip6 = document.querySelector("#trip6");
const depart6 = document.querySelector("#depart6");
const return6 = document.querySelector("#return6");
const from7 = document.querySelector("#from7");
const to7 = document.querySelector("#to7");
const trip7 = document.querySelector("#trip7");
const depart7 = document.querySelector("#depart7");
const return7 = document.querySelector("#return7");
const from8 = document.querySelector("#from8");
const to8 = document.querySelector("#to8");
const trip8 = document.querySelector("#trip8");
const depart8 = document.querySelector("#depart8");
const return8 = document.querySelector("#return8");
const from9 = document.querySelector("#from9");
const to9 = document.querySelector("#to9");
const trip9 = document.querySelector("#trip9");
const depart9 = document.querySelector("#depart9");
const return9 = document.querySelector("#return9");



from0.innerHTML = dashboard_data[0].from;
to0.innerHTML = dashboard_data[0].to;
trip0.innerHTML = dashboard_data[0].trip;
depart0.innerHTML = dashboard_data[0].depart;
if(dashboard_data[0].return == undefined){
    return0.innerHTML = "-";
}else {
    return0.innerHTML = dashboard_data[0].return;
}
from1.innerHTML = dashboard_data[1].from;
to1.innerHTML = dashboard_data[1].to;
trip1.innerHTML = dashboard_data[1].trip;
depart1.innerHTML = dashboard_data[1].depart;
if(dashboard_data[1].return == undefined){
    return1.innerHTML = "-";
}else {
    return1.innerHTML = dashboard_data[1].return;
}
from2.innerHTML = dashboard_data[2].from;
to2.innerHTML = dashboard_data[2].to;
trip2.innerHTML = dashboard_data[2].trip;
depart2.innerHTML = dashboard_data[2].depart;
if(dashboard_data[2].return == undefined){
    return2.innerHTML = "-";
}else {
    return2.innerHTML = dashboard_data[2].return;
}
from3.innerHTML = dashboard_data[3].from;
to3.innerHTML = dashboard_data[3].to;
trip3.innerHTML = dashboard_data[3].trip;
depart3.innerHTML = dashboard_data[3].depart;
if(dashboard_data[3].return == undefined){
    return3.innerHTML = "-";
}else {
    return3.innerHTML = dashboard_data[3].return;
}
from4.innerHTML = dashboard_data[4].from;
to4.innerHTML = dashboard_data[4].to;
trip4.innerHTML = dashboard_data[4].trip;
depart4.innerHTML = dashboard_data[4].depart;
if(dashboard_data[4].return == undefined){
    return4.innerHTML = "-";
}else {
    return4.innerHTML = dashboard_data[4].return;
}
from5.innerHTML = dashboard_data[5].from;
to5.innerHTML = dashboard_data[5].to;
trip5.innerHTML = dashboard_data[5].trip;
depart5.innerHTML = dashboard_data[5].depart;
if(dashboard_data[5].return == undefined){
    return5.innerHTML = "-";
}else {
    return5.innerHTML = dashboard_data[5].return;
}
from6.innerHTML = dashboard_data[6].from;
to6.innerHTML = dashboard_data[6].to;
trip6.innerHTML = dashboard_data[6].trip;
depart6.innerHTML = dashboard_data[6].depart;
if(dashboard_data[6].return == undefined){
    return6.innerHTML = "-";
}else {
    return6.innerHTML = dashboard_data[6].return;
}
from7.innerHTML = dashboard_data[7].from;
to7.innerHTML = dashboard_data[7].to;
trip7.innerHTML = dashboard_data[7].trip;
depart7.innerHTML = dashboard_data[7].depart;
if(dashboard_data[7].return == undefined){
    return7.innerHTML = "-";
}else {
    return7.innerHTML = dashboard_data[7].return;
}
from8.innerHTML = dashboard_data[8].from;
to8.innerHTML = dashboard_data[8].to;
trip8.innerHTML = dashboard_data[8].trip;
depart8.innerHTML = dashboard_data[8].depart;
if(dashboard_data[8].return == undefined){
    return8.innerHTML = "-";
}else {
    return8.innerHTML = dashboard_data[8].return;
}
from9.innerHTML = dashboard_data[9].from;
to9.innerHTML = dashboard_data[9].to;
trip9.innerHTML = dashboard_data[9].trip;
depart9.innerHTML = dashboard_data[9].depart;
if(dashboard_data[9].return == undefined){
    return9.innerHTML = "-";
}else {
    return9.innerHTML = dashboard_data[9].return;
}

