figure7 = {
	title:'Figure 7. Index of Economic Freedom (US) (1995–2015)',
	subtitle:`<p>The Index of Economic Freedom, a compilation of 10 indicators measured by the Heritage Foundation, is a proxy for public policies that promote open markets and the movement of capital, labor, products, and resources. Since 1995, the upward trend for the United States has been driven primarily by gains in investment freedom, financial freedom, trade freedom, and business freedom (4 of the index’s 10 components). Greater economic freedom increases competition and collaboration. After dropping in recent years, economic freedom is increasing again, led by changes in government size, monetary freedom, and labor freedom.</p>`,
	data:[
		{'Year':1995,'Index (0–100)':76.65},
		{'Year':1996,'Index (0–100)':76.72},
		{'Year':1997,'Index (0–100)':75.59},
		{'Year':1998,'Index (0–100)':75.43},
		{'Year':1999,'Index (0–100)':75.54},
		{'Year':2000,'Index (0–100)':76.42},
		{'Year':2001,'Index (0–100)':79.06},
		{'Year':2002,'Index (0–100)':78.36},
		{'Year':2003,'Index (0–100)':78.18},
		{'Year':2004,'Index (0–100)':78.75},
		{'Year':2005,'Index (0–100)':79.95},
		{'Year':2006,'Index (0–100)':81.24},
		{'Year':2007,'Index (0–100)':81.18},
		{'Year':2008,'Index (0–100)':80.97},
		{'Year':2009,'Index (0–100)':80.70},
		{'Year':2010,'Index (0–100)':78.00,marker:true},
		{'Year':2011,'Index (0–100)':77.80},
		{'Year':2012,'Index (0–100)':76.30},
		{'Year':2013,'Index (0–100)':76.00},
		{'Year':2014,'Index (0–100)':75.50},
		{'Year':2015,'Index (0–100)':76.20,marker:true}
	],
	config:{
		x:'Year',
		y:'Index (0–100)',
		showTrendline:true,
		legend:{
			'Index (0–100)':'#00B5AF'
		},
		yLabel:'Index (0-100)',
		yLog:false,
		yLimit:true,
		yFormat:'',
		yRoundDecimal:true,
		yRange:[72,82],
	},
	legendComponent:[
		{'name':'Index of Economic Freedom (Overall Score)','color':'#00B5AF','shape':'block'},
		{'name':'Linear (Index of Economic Freedom (Overall Score))','color':'#878A8F','shape':'dotted'}
	],
	type:'line:single',
	source:'Heritage Foundation’s 2016 Index of Economic Freedom.'
}
