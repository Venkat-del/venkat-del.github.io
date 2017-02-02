figure6 = {
	title:'Figure 6. Wireless subscriptions as a percentage of the US population (1989–2015)',
	subtitle:`<p>More people are connected to the digital infrastructure via mobile devices. In 2015, the percentage of wireless subscriptions compared to the US population reached 118 percent, meaning there are now more wireless subscriptions than people (although not every individual has a subscription). Widespread connectivity enables the sharing of data, information, and knowledge from nearly any geographic location.</p>`,
	data:[
		{'Year':1989,'% of US population':1.42},
		{'Year':1990,'% of US population':2.12},
		{'Year':1991,'% of US population':3.00},
		{'Year':1992,'% of US population':4.33},
		{'Year':1993,'% of US population':6.21},
		{'Year':1994,'% of US population':9.27},
		{'Year':1995,'% of US population':12.86},
		{'Year':1996,'% of US population':16.61},
		{'Year':1997,'% of US population':20.66},
		{'Year':1998,'% of US population':25.61},
		{'Year':1999,'% of US population':31.55},
		{'Year':2000,'% of US population':38.80},
		{'Year':2001,'% of US population':45.03},
		{'Year':2002,'% of US population':48.90},
		{'Year':2003,'% of US population':54.65},
		{'Year':2004,'% of US population':62.12},
		{'Year':2005,'% of US population':70.26},
		{'Year':2006,'% of US population':78.00},
		{'Year':2007,'% of US population':84.67},
		{'Year':2008,'% of US population':86.36},
		{'Year':2009,'% of US population':90.10},
		{'Year':2010,'% of US population':95.78},
		{'Year':2011,'% of US population':101.36},
		{'Year':2012,'% of US population':103.94,marker:true},
		{'Year':2013,'% of US population':106.08},
		{'Year':2014,'% of US population':111.46},
		{'Year':2015,'% of US population':117.58,marker:true}
	],
	config:{
		x:'Year',
		y:'% of US population',
		legend:{
			'% of US population':'#00B5AF'
		},
		yLog:false,
		yLimit:false,
		yFormat:'%',
		yRange:[0,140],
		yExplicitlabels:[ 0,20,40,60,80,100,120,140],
	},
	legendComponent:[
		{'name':'% of US population','color':'#00B5AF','shape':'block'}
	],
	type:'line:single',
	source:'CTIA.'
}
