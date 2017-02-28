console.log("Hi");
window.onload = function(){
    if (annyang) {
        var commands = {
            'Show overview': function() {
                plot_stacked('Shift Index')
            },
            'show comparison': function() {
                load_comp()
            },
            'show single': function() {
                load_comp()
            }
        };
        annyang.addCommands(commands);
        //annyang.start();
    }
}
