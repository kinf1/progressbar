var React = require('react');
var ReactDOM = require('react-dom');

var ProgressBar = React.createClass({
	barWidth : 0,
	color : "LightBlue",
	barWidthText : 0,
	
	render: function(){
		console.log("Inside the ProgressBar render function");
		var activeProgessBarId = this.props.activeProgressBar;
		var myId = this.props.id;
		var incrementValue = this.props.progressValue;
		var tempWidth = 0;
		
		if(activeProgessBarId === myId){
			tempWidth = this.barWidthText + incrementValue;
			
			if(tempWidth > 100){
			      this.color = '#FF5050';
			 }else{
			 	this.color = 'LightBlue';
			 }
			 
			 this.barWidthText = tempWidth;
			 
			 if(tempWidth > 100){
			 	this.barWidthText = tempWidth;
			 	tempWidth = 100;
			 }
			 else if (tempWidth < 0){
			 	tempWidth = 0;
			 	this.barWidthText = tempWidth;
			 }
			 this.barWidth = tempWidth;
		}
		
		var outerDivStyle = {
		   borderColor: '#ddd',
		   borderWidth: '2px',
		   borderStyle : 'solid',
		   position: 'relative',
		   textAlign: 'center',
		   verticalAlign: 'middle'
		};
		
		var progressBarStyle = {
			width: this.barWidth+'%',
			backgroundColor: this.color,
			height: '50px'
		};
		
		var labelStyle = {
			fontWeight: 'bold',
			position: 'absolute',
			zIndex : '10'
		};

		return (
		  <div  style={outerDivStyle}>
		  	<span style={labelStyle}>
				{this.barWidthText}%
			</span>
		  	<div style={progressBarStyle}>
		  	</div>
		  </div>
		);
	}
});

var Button = React.createClass({
	
	localAddToProgressFn: function(e){
		 if (typeof this.props.addToProgressFn === 'function') {
		     this.props.addToProgressFn(this.props.buttonValue);
        	}
	},
	render: function(){
		console.log("Inside the Button render function");
		var buttonStyle = {
		   margin : '20px'
		};
		var name = this.props.buttonName;
		return ( <button onClick={this.localAddToProgressFn} style={buttonStyle}> {name} </button> )
	}
});

var DropDownList = React.createClass({
	
	render: function(){
		console.log("Inside the DDL render function");
		var ddlStyle = {
		  marginRight : '20px'
		};
		return (
			<select onChange={this.props.listChangedFn}>
				<option value="progressBar1">Progress 1 </option>
				<option value="progressBar2">Progress 2 </option>
				<option value="progressBar3">Progress 3 </option>
			</select>
		      );
	}

});

var Container = React.createClass({

	getInitialState: function(){
		return{
		      activeProgressBarId : "",
		      buttonIncrementValue : 0
		   }
	},
	
	listChanged : function(e){
		//this.setState({activeProgressBarId : e.target.value});
		this.state.activeProgressBarId = e.target.value;
	},
	componentDidMount : function(){
		this.state.activeProgressBarId = "progressBar1";
	},
	addToProgress: function(value){
		this.setState({buttonIncrementValue : value});
	},
	
	render : function(){
		console.log("Inside the Container render function");
		var containerStyle = {
		  borderColor : '#ddd',
		  borderStyle : 'solid',
		  borderWidth : '4px',
		  margin: '20px'
		};
		
		var headerStyle = {
		  textAlign: 'center'
		};
		
		var vAlignStyle = {
			display: 'inline-block',
			verticalAlign: 'middle',
    			float: 'none'
		};
		return (
			<div className="col-md-4 col-sm-8 col-xs-10" style={containerStyle}>
			   <h2 style={headerStyle}> Progress Bars Demo </h2>
			   <br/>
			   <div className="row">
				   <div className="col-md-12 col-sm-12 col-xs-12">
					   <ProgressBar id="progressBar1" progressValue={this.state.buttonIncrementValue} activeProgressBar={this.state.activeProgressBarId} />
					   <br/>
					   <ProgressBar id="progressBar2" progressValue={this.state.buttonIncrementValue} activeProgressBar={this.state.activeProgressBarId } />
					   <br/>
					   <ProgressBar id="progressBar3" progressValue={this.state.buttonIncrementValue} activeProgressBar={this.state.activeProgressBarId }/>
					   <br/>
				  </div>
			   </div>
			   <div className="row">
			   	<div className="col-md-10 text-center">
					<div className="col-md-4 col-sm-12 col-xs-10 text-center" style={vAlignStyle} >
						<DropDownList id="list1" listChangedFn={this.listChanged} />
					</div>

					<div className="col-md-2 col-sm-3 col-xs-6 text-center" style={vAlignStyle}>
						<Button id="button1" addToProgressFn={this.addToProgress} buttonValue={-25} buttonName="-25" />
					</div>

					<div className="col-md-2 col-sm-3 col-xs-6 text-center" style={vAlignStyle}>
						<Button id="button2" addToProgressFn={this.addToProgress} buttonValue={-10} buttonName={"-10"} />
					</div>

					<div className="col-md-2 col-sm-3 col-xs-6 text-center" style={vAlignStyle}>
						<Button id="button3" addToProgressFn={this.addToProgress} buttonValue={+10} buttonName={"+10"} />
					</div>

					<div className="col-md-2 col-sm-3 col-xs-6 text-center" style={vAlignStyle}>
						<Button id="button4" addToProgressFn={this.addToProgress} buttonValue={+25} buttonName={"+25"} />
					</div>
				</div>
			   </div>
			</div>
		);
	}

});

ReactDOM.render(<Container />,document.getElementById("react-root"));
