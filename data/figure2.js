figure2 = {
	title:'Figure 2. Computing cost/performance (1992–2015)',
	subtitle:`<p>The cost of computing power has decreased significantly, from $222 per 1 million transistors in 1992 to $0.03 per 1 million transistors in 2015. This ongoing trend enables the increasing affordability of the computational power at the core of the digital infrastructure.</p>`,
	data:[
		{'Year':1992,'$ per 1 million transistors':222.1983879},
		{'Year':1993,'$ per 1 million transistors':144.3110676},
		{'Year':1994,'$ per 1 million transistors':93.7256315},
		{'Year':1995,'$ per 1 million transistors':60.87193552},
		{'Year':1996,'$ per 1 million transistors':39.53446325},
		{'Year':1997,'$ per 1 million transistors':25.6764266},
		{'Year':1998,'$ per 1 million transistors':16.67605498},
		{'Year':1999,'$ per 1 million transistors':10.83058847},
		{'Year':2000,'$ per 1 million transistors':7.034136472},
		{'Year':2001,'$ per 1 million transistors':4.568456834},
		{'Year':2002,'$ per 1 million transistors':2.967073205},
		{'Year':2003,'$ per 1 million transistors':1.912317547},
		{'Year':2004,'$ per 1 million transistors':1.128289477},
		{'Year':2005,'$ per 1 million transistors':0.689453559},
		{'Year':2006,'$ per 1 million transistors':0.474885349},
		{'Year':2007,'$ per 1 million transistors':0.368403245},
		{'Year':2008,'$ per 1 million transistors':0.265311242},
		{'Year':2009,'$ per 1 million transistors':0.19},
		{'Year':2010,'$ per 1 million transistors':0.127083333},
		{'Year':2011,'$ per 1 million transistors':0.09996129},
		{'Year':2012,'$ per 1 million transistors':0.062464,marker:true},
		{'Year':2013,'$ per 1 million transistors':0.046525424},
		{'Year':2014,'$ per 1 million transistors':0.045665278},
		{'Year':2015,'$ per 1 million transistors':0.032818,marker:true}
	],
	config:{
		x:'Year',
		y:'$ per 1 million transistors',
		legend:{
			'$ per 1 million transistors':'#007DB6'
		},
		yLog:true,
		yLimit:false,
		yFormat:'$',
		yComma:true,
		xRaise:0,
		yRange:[0.01,1000],
		yExplicitlabels:[0.01, 0.1, 1, 10, 100, 1000],
	},
	legendComponent:[
		{'name':'$ per 1 million transistors','color':'#007DB6','shape':'block'}
	],
	type:'line:single',
	source:'Leading technology research vendor.'
}
