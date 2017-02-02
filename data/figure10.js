figure10 = {
	title:'Figure 10. Wireless minutes (1991–2015) vs. SMS volume (2000–2015)',
	subtitle:`<p>Mobile devices are increasingly important for connectivity and access. Despite several years when SMS volume was growing far faster than wireless minutes, in recent years SMS volume has declined, and wireless minutes increased, as a result of cheaper over-the-top (OTT) messaging applications (WhatsApp, MessageMe, Google Talk, Viber) and social media-based chat.</p>`,
	data:{
		yl:[
			{'Year':1991,'Wireless minutes (billions)':11.15401598},
			{'Year':1992,'Wireless minutes (billions)':13.56753316},
			{'Year':1993,'Wireless minutes (billions)':19.16097428},
			{'Year':1994,'Wireless minutes (billions)':26.95000024},
			{'Year':1995,'Wireless minutes (billions)':37.76712272},
			{'Year':1996,'Wireless minutes (billions)':51.97020018},
			{'Year':1997,'Wireless minutes (billions)':62.92308246},
			{'Year':1998,'Wireless minutes (billions)':89.01043864},
			{'Year':1999,'Wireless minutes (billions)':147.7259588},
			{'Year':2000,'Wireless minutes (billions)':258.7548591},
			{'Year':2001,'Wireless minutes (billions)':456.9641652},
			{'Year':2002,'Wireless minutes (billions)':619.8357774},
			{'Year':2003,'Wireless minutes (billions)':829.8768518},
			{'Year':2004,'Wireless minutes (billions)':1101.291762},
			{'Year':2005,'Wireless minutes (billions)':1495.44697},
			{'Year':2006,'Wireless minutes (billions)':1798.361585},
			{'Year':2007,'Wireless minutes (billions)':2118.646478},
			{'Year':2008,'Wireless minutes (billions)':2202.877975},
			{'Year':2009,'Wireless minutes (billions)':2237.323554},
			{'Year':2010,'Wireless minutes (billions)':2241.323211},
			{'Year':2011,'Wireless minutes (billions)':2295.51472},
			{'Year':2012,'Wireless minutes (billions)':2299.916848},
			{'Year':2013,'Wireless minutes (billions)':2618.182348},
			{'Year':2014,'Wireless minutes (billions)':2454.929683},
			{'Year':2015,'Wireless minutes (billions)':2881.018798}
		],
		yr:[
			{'Year':2000,'SMS messages (billions)':0.01440213},
			{'Year':2001,'SMS messages (billions)':0.252825025},
			{'Year':2002,'SMS messages (billions)':1.022852479},
			{'Year':2003,'SMS messages (billions)':2.075320313},
			{'Year':2004,'SMS messages (billions)':4.659442602},
			{'Year':2005,'SMS messages (billions)':9.762270578},
			{'Year':2006,'SMS messages (billions)':18.70597389},
			{'Year':2007,'SMS messages (billions)':48.14075428},
			{'Year':2008,'SMS messages (billions)':110.441425},
			{'Year':2009,'SMS messages (billions)':135.1720654},
			{'Year':2010,'SMS messages (billions)':187.662757},
			{'Year':2011,'SMS messages (billions)':193.1152307},
			{'Year':2012,'SMS messages (billions)':171.2584974},
			{'Year':2013,'SMS messages (billions)':153.2909287},
			{'Year':2014,'SMS messages (billions)':169.303908},
			{'Year':2015,'SMS messages (billions)':156.6653222}
		]
	},
	config:{
		x:'Year',
		yl:'Wireless minutes (billions)',
		yr:'SMS messages (billions)',
		legend:{
			'Wireless minutes (billions)':'#00B5AF',
			'SMS messages (billions)':'#00AAE7'
		},
		yLabel:'Wireless minutes (billions)',
		yrLabel:'SMS messages (billions)',
		yComma:true,
		yRange:[0,3500],
		yExplicitlabels:[ 0,500,1000,1500,2000,2500,3000,3500],
		y2Range:[0,250],
		y2Explicitlabels:[ 0,50,100,150,200,250],
	},
	legendComponent:[
		{'name':'Wireless minutes (billions)','color':'#00B5AF','shape':'block'},
		{'name':'SMS messages (billions)','color':'#00AAE7','shape':'block'}
	],
	type:'line:dualaxis',
	source:'CTIA, Deloitte analysis.'
}
