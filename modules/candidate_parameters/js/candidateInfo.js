!function(e){function t(r){if(a[r])return a[r].exports;var s=a[r]={exports:{},id:r,loaded:!1};return e[r].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=React.createClass({displayName:"CandidateInfo",getInitialState:function(){return{caveatOptions:{true:"True",false:"False"},Data:[],formData:{},updateResult:null,errorMessage:null,isLoaded:!1,loadedData:0}},componentDidMount:function(){var e=this;$.ajax(this.props.dataURL,{dataType:"json",xhr:function t(){var t=new window.XMLHttpRequest;return t.addEventListener("progress",function(t){e.setState({loadedData:t.loaded})}),t},success:function(t){var a={flaggedCaveatemptor:t.flagged_caveatemptor,flaggedOther:t.flagged_other,flaggedReason:t.flagged_reason};e.otherOption=null;var r=t.caveatReasonOptions;if(r)for(var s in r)if("Other"===r[s]){e.otherOption=s;break}e.setState({Data:t,isLoaded:!0,formData:a})},error:function(t,a,r){e.setState({error:"An error occurred when loading the form!"})}})},setFormData:function(e,t){var a=this.state.formData;a[e]=t,"flaggedCaveatemptor"===e&&"false"===t&&(a.flaggedReason="",a.flaggedOther="",this.refs.flaggedReason.state.value="",this.refs.flaggedReason.state.hasError=!1,this.refs.flaggedOther.state.value=""),"flaggedReason"===e&&t!==this.otherOption&&(a.flaggedOther="",this.refs.flaggedOther.state.value=""),this.setState({formData:a})},onSubmit:function(e){e.preventDefault()},render:function(){if(!this.state.isLoaded)return void 0!==this.state.error?React.createElement("div",{className:"alert alert-danger text-center"},React.createElement("strong",null,this.state.error)):React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var e=!0,t=null;loris.userHasPermission("candidate_parameter_edit")&&(e=!1,t=React.createElement(ButtonElement,{label:"Update"}));var a=!0,r=!1;"true"===this.state.formData.flaggedCaveatemptor&&(a=!1,r=!0);var s=null,n=null,l=!0,o=!1;for(var i in this.state.Data.caveatReasonOptions)if(this.state.Data.caveatReasonOptions.hasOwnProperty(i)&&"Other"===this.state.Data.caveatReasonOptions[i]){s=i;break}this.state.formData.flaggedReason===s&&(o=!0,l=!1),"false"===this.state.formData.flaggedCaveatemptor&&(a=!0,r=!1,l=!0,o=!1),null!==s&&(n=React.createElement(TextareaElement,{label:"If Other, please specify",name:"flaggedOther",value:this.state.formData.flaggedOther,onUserInput:this.setFormData,ref:"flaggedOther",disabled:l,required:o}));var d=[],c=this.state.Data.extra_parameters;for(var f in c)if(c.hasOwnProperty(f)){var u=c[f].ParameterTypeID,p="PTID"+u,m=this.state.Data.parameter_values[u];switch(c[f].Type.substring(0,3)){case"enu":var h=c[f].Type.substring(5);h=h.slice(0,-1),h=h.replace(/'/g,""),h=h.split(",");var g=[];for(var v in h)h.hasOwnProperty(v)&&(g[h[v]]=h[v]);d.push(React.createElement(SelectElement,{label:c[f].Description,name:p,options:g,value:m,onUserInput:this.setFormData,ref:p,disabled:e}));break;case"dat":d.push(React.createElement(DateElement,{label:c[f].Description,name:p,value:m,onUserInput:this.setFormData,ref:p,disabled:e}));break;default:d.push(React.createElement(TextareaElement,{label:c[f].Description,name:p,value:m,onUserInput:this.setFormData,ref:p,disabled:e}))}}var D="",R="alert text-center hide";if(this.state.updateResult)if("success"===this.state.updateResult)R="alert alert-success text-center",D="Update Successful!";else if("error"===this.state.updateResult){var b=this.state.errorMessage;R="alert alert-danger text-center",D=b?b:"Failed to update!"}return React.createElement("div",{class:"row"},React.createElement("div",{className:R,role:"alert",ref:"alert-message"},D),React.createElement(FormElement,{name:"candidateInfo",onSubmit:this.handleSubmit,ref:"form",class:"col-md-6"},React.createElement(StaticElement,{label:"PSCID",text:this.state.Data.pscid}),React.createElement(StaticElement,{label:"DCCID",text:this.state.Data.candID}),React.createElement(SelectElement,{label:"Caveat Emptor Flag for Candidate",name:"flaggedCaveatemptor",options:this.state.caveatOptions,value:this.state.formData.flaggedCaveatemptor,onUserInput:this.setFormData,ref:"flaggedCaveatemptor",disabled:e,required:!0}),React.createElement(SelectElement,{label:"Reason for Caveat Emptor Flag",name:"flaggedReason",options:this.state.Data.caveatReasonOptions,value:this.state.formData.flaggedReason,onUserInput:this.setFormData,ref:"flaggedReason",disabled:a,required:r}),n,d,t))},handleSubmit:function(e){e.preventDefault();var t=this.state.formData,a=this,r=new FormData;for(var s in t)t.hasOwnProperty(s)&&""!==t[s]&&r.append(s,t[s]);r.append("tab",this.props.tabName),r.append("candID",this.state.Data.candID),$.ajax({type:"POST",url:a.props.action,data:r,cache:!1,contentType:!1,processData:!1,success:function(e){a.setState({updateResult:"success"}),a.showAlertMessage()},error:function(e){if(""!==e.responseText){var t=JSON.parse(e.responseText).message;a.setState({updateResult:"error",errorMessage:t}),a.showAlertMessage()}}})},showAlertMessage:function(){var e=this;if(null!==this.refs["alert-message"]){var t=this.refs["alert-message"];$(t).fadeTo(2e3,500).delay(3e3).slideUp(500,function(){e.setState({updateResult:null})})}}}),r=React.createFactory(a);window.CandidateInfo=a,window.RCandidateInfo=r,t.default=a}]);
//# sourceMappingURL=candidateInfo.js.map