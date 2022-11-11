(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-tables"],{"05e3":function(t,a,e){},"0a4e":function(t,a,e){"use strict";e("05e3")},b7f9:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.patientData?e("div",{staticClass:"card"},[e("div",{staticClass:"card-header border-0"},[e("div",{staticClass:"row align-items-center"},[e("div",{staticClass:"col"},[e("h3",{staticClass:"mb-0"},[t._v(" "+t._s(t.title)+" "),!0===t.active?e("i",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.top",value:"Table shows all currently active patients. As soon as a patient is provided with a dismissal date the patient is moved to the dismissed patients table.",expression:"\n              'Table shows all currently active patients. As soon as a patient is provided with a dismissal date the patient is moved to the dismissed patients table.'\n            ",modifiers:{hover:!0,top:!0}}],staticClass:"far fa-question-circle text-muted"}):e("i",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.top",value:"Table shows all dismissed patients as soon as a dismissal date is set.",expression:"\n              'Table shows all dismissed patients as soon as a dismissal date is set.'\n            ",modifiers:{hover:!0,top:!0}}],staticClass:"far fa-question-circle text-muted"})])]),e("div",{staticClass:"col text-right"},[!0===t.active?e("base-button",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.top",value:"Add a new Patient",expression:"'Add a new Patient'",modifiers:{hover:!0,top:!0}}],attrs:{type:"btn btn-sm btn-primary",icon:"fas fa-plus"},on:{click:function(a){t.patientModal=!0,t.newPatient=!0}}},[t._v(" new Patient ")]):t._e(),e("modal",{attrs:{show:t.patientModal},on:{"update:show":function(a){t.patientModal=a}}},[e("template",{slot:"header"},[t.newPatient?e("div",[e("h2",{staticClass:"modal-title"},[t._v("New Patient")])]):e("div",[e("h2",{staticClass:"modal-title"},[t._v("Edit Patient")])])]),e("div",{staticClass:"row align-items-center text-left"},[e("div",{staticClass:"card col-md-12 mt-3"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"row align-items-center"},[e("base-input",{staticClass:"col-md-6",attrs:{label:"First Name"},model:{value:t.first_name,callback:function(a){t.first_name=a},expression:"first_name"}}),e("base-input",{staticClass:"col-md-6",attrs:{label:"Last Name"},model:{value:t.last_name,callback:function(a){t.last_name=a},expression:"last_name"}}),e("label",{staticClass:"form-control-label mt--3 col-md-4"},[t._v(" Admission "),e("base-input",{staticClass:"mt-3",attrs:{disabled:"",value:new Date(this.admission).toLocaleString()}})],1),e("base-button",{staticClass:"btn btn-md col-md-2 mt--2 picker-button",attrs:{icon:"fa fa-calendar",type:"primary"},on:{click:function(a){return t.openPicker("admission-picker")}}}),e("label",{staticClass:"form-control-label mt-md--3 mt-sm-10 col-md-3"},[t._v(" Dismissal "),e("base-input",{staticClass:"mt-3",attrs:{disabled:"",value:new Date(this.dismissal).toLocaleString()}})],1),e("base-button",{staticClass:"btn btn-md col-md-1 mt--2 picker-button",attrs:{icon:"fa fa-calendar",type:"primary"},on:{click:function(a){return t.openPicker("dismissal-picker")}}}),e("base-button",{staticClass:"col-md-1 btn btn-md ml-4 mt--2 mt-sm-10",attrs:{type:"danger",icon:"fas fa-times"},on:{click:function(a){t.dismissal=null}}})],1)])])]),e("template",{slot:"footer"},[e("base-button",{attrs:{type:"secondary"},on:{click:function(a){t.patientModal=!1}}},[t._v("Close ")]),t.newPatient?[e("base-button",{attrs:{type:"primary"},on:{click:function(a){return t.addPatient()}}},[t._v("Save patient ")])]:[e("base-button",{attrs:{type:"primary"},on:{click:function(a){return t.editPatient()}}},[t._v("Save changes ")])]],2)],2),e("datetime",{ref:"admission-picker",attrs:{type:"datetime","backdrop-click":!0,auto:!0},model:{value:t.admission,callback:function(a){t.admission=a},expression:"admission"}}),e("datetime",{ref:"dismissal-picker",attrs:{type:"datetime","backdrop-click":!0,auto:!0},model:{value:t.dismissal,callback:function(a){t.dismissal=a},expression:"dismissal"}})],1)])]),!0===t.active?e("div",[e("div",{staticClass:"table-responsive"},[e("base-table",{attrs:{"thead-classes":"thead-light",data:t.tableData},scopedSlots:t._u([{key:"default",fn:function(a){var i=a.row;return null===i.dismissal_date?[e("th",{attrs:{scope:"row"}},[e("router-link",{attrs:{to:"/patients/"+i.id}},[t._v(t._s(i.id)+" ")])],1),e("td",[t._v(" "+t._s(i.first_name)+" ")]),e("td",[t._v(" "+t._s(i.last_name)+" ")]),e("td",[t._v(" "+t._s(new Intl.DateTimeFormat("en-GB").format(new Date(i.admission_date)))+" ")]),e("td",[null===i.dismissal_date?[e("i",{staticClass:"far fa-clock"})]:[t._v(" "+t._s(new Intl.DateTimeFormat("en-GB").format(new Date(i.dismissal_date)))+" ")]],2),e("td",[e("base-button",{staticClass:"btn btn-sm",attrs:{icon:"fas fa-edit",type:"primary"},on:{click:function(a){t.initializePatientModal(i.id),t.edit=!0}}})],1),e("td",[e("router-link",{attrs:{to:"/patients/"+i.id}},[e("base-button",{staticClass:"btn btn-sm",attrs:{icon:"fas fa-chart-bar",type:"primary"},on:{click:function(t){i.id}}},[t._v(" Patient Report ")])],1)],1)]:void 0}}],null,!0)},[e("template",{slot:"columns"},[e("th",[t._v("ID")]),e("th",[t._v("First Name")]),e("th",[t._v("Last Name")]),e("th",[t._v("Admission")]),e("th",[t._v("Dismissal")]),e("th",[t._v(" Edit/Delete "),e("i",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.top",value:"Edit/Delete Patient",expression:"'Edit/Delete Patient'",modifiers:{hover:!0,top:!0}}],staticClass:"far fa-question-circle"})]),e("th",[t._v(" Report "),e("i",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.top",value:"See/Edit Patient Report",expression:"'See/Edit Patient Report'",modifiers:{hover:!0,top:!0}}],staticClass:"far fa-question-circle"})])])],2)],1)]):!1===t.active?e("div",[e("div",{staticClass:"table-responsive"},[e("base-table",{attrs:{"thead-classes":"thead-light",data:t.tableData},scopedSlots:t._u([{key:"default",fn:function(a){var i=a.row;return i.dismissal_date?[e("th",{attrs:{scope:"row"}},[e("router-link",{attrs:{to:"/patients/"+i.id}},[t._v(t._s(i.id)+" ")])],1),e("td",[t._v(" "+t._s(i.first_name)+" ")]),e("td",[t._v(" "+t._s(i.last_name)+" ")]),e("td",[t._v(" "+t._s(new Intl.DateTimeFormat("en-GB").format(new Date(i.admission_date)))+" ")]),e("td",[null===i.dismissal_date?[e("i",{staticClass:"far fa-clock"})]:[t._v(" "+t._s(new Intl.DateTimeFormat("en-GB").format(new Date(i.dismissal_date)))+" ")]],2),e("td",[e("base-button",{staticClass:"btn btn-sm",attrs:{icon:"fas fa-edit",type:"primary"},on:{click:function(a){t.initializePatientModal(i.id),t.edit=!0}}})],1),e("td",[e("router-link",{attrs:{to:"/patients/"+i.id}},[e("base-button",{staticClass:"btn btn-sm",attrs:{icon:"fas fa-chart-bar",type:"primary"},on:{click:function(t){i.id}}},[t._v(" Patient Report ")])],1)],1)]:void 0}}],null,!0)},[e("template",{slot:"columns"},[e("th",[t._v("ID")]),e("th",[t._v("First Name")]),e("th",[t._v("Last Name")]),e("th",[t._v("Admission")]),e("th",[t._v("Dismissal")]),e("th",[t._v(" Edit/Delete "),e("i",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.top",value:"Edit/Delete Patient",expression:"'Edit/Delete Patient'",modifiers:{hover:!0,top:!0}}],staticClass:"far fa-question-circle"})]),e("th",[t._v(" Report "),e("i",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.top",value:"See/Edit Patient Report",expression:"'See/Edit Patient Report'",modifiers:{hover:!0,top:!0}}],staticClass:"far fa-question-circle"})])])],2)],1)]):t._e()]):t._e()},s=[],n=(e("7db0"),e("5530")),o=(e("96cf"),e("1da1")),l=e("2f62"),r=e("859b"),d={name:"patients-table",components:{datetime:r["Datetime"]},props:["title","active"],data:function(){return{datepicker:!1,patientModal:!1,newPatient:!0,patientId:null,edit:!1,admission:null,dismissal:null,first_name:null,last_name:null,tableData:this.patientData}},methods:{openPicker:function(t){var a=this.$refs[t].$el.firstChild.nextElementSibling;a&&a.click()},initializePatientModal:function(t){var a=this.tableData.find((function(a){return a.id===t}));this.first_name=a.first_name,this.last_name=a.last_name,this.admission=a.admission_date,this.dismissal=a.dismissal_date,this.patientId=t,this.newPatient=!1,this.patientModal=!0},addPatient:function(){var t={first_name:this.first_name,last_name:this.last_name,admission:""==this.admission?null:this.admission,dismissal:""==this.dismissal?null:this.dismissal};this.$store.dispatch("addPatient",{patient:t}),this.patientModal=!1},editPatient:function(){var t={first_name:this.first_name,last_name:this.last_name,admission:this.admission,dismissal:this.dismissal};this.$store.dispatch("editPatient",{id:this.patientId,patient:t}),this.first_name=null,this.last_name=null,this.admission=null,this.dismissal=null,this.patientModal=!1},deletePatient:function(t){confirm("Do you really want to delete this Patient?")&&this.$store.dispatch("deletePatient",{id:t})}},watch:{patientData:function(){this.tableData=this.patientData}},beforeDestroy:function(){clearInterval(this.patientData)},created:function(){return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},computed:Object(n["a"])({},Object(l["b"])(["patientData"]))},c=d,m=(e("0a4e"),e("2877")),p=Object(m["a"])(c,i,s,!1,null,null,null);a["a"]=p.exports},f743:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("base-header",{staticClass:"pb-6 pb-8 pt-5 pt-md-8",staticStyle:{"background-color":"#dbe5f3"},attrs:{type:""}}),e("div",{staticClass:"container-fluid mt--7"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("patients-table",{attrs:{title:"Current Patients",active:!0}})],1)])]),e("div",{staticClass:"container-fluid mt-5"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("patients-table",{attrs:{title:"Dismissed Patients",active:!1}})],1)])])],1)},s=[],n=e("b7f9"),o={name:"tables",components:{PatientsTable:n["a"]},beforeMount:function(){this.$store.dispatch("loadPatients")}},l=o,r=e("2877"),d=Object(r["a"])(l,i,s,!1,null,null,null);a["default"]=d.exports}}]);