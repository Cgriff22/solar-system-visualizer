# Solar System Visualizer

This app is a two dimensional, top down visualization of our solar system that I modeled using keplerian orbits and NASA JPL planetary ephemerides.

There are two versions of this program: 

One version uses keplerian models to simulate orbits in motion -- keplerian models determine planetary positions using relatively simple geometry. They are 
therefore much less accurate than simulations modeled using ephemeris data, albeit much more compute efficient. 

Another version uses raw planetary ephemeris data for maximum accuracy. This one was fun because I got to work with actual NASA data, however calculating 
positions to this level of accuracy is much more resource intensive than the keplerian version. CPU usage would very quickly max out when a continous 
simulation was run, at which point the simulation would begin to slow down and 'lag' as my cpu fan ramped up to full power, hence the creation of the 
keplerian version. I plan on reinstating this model so users can switch between the two at will. Continous simulation will not be permitted, however I will 
add more data visualizations and show interesting bits of information about the planets on each still shot.
