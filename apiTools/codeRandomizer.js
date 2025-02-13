
module.exports =  function codeRandomizer(){
        return Math.random().toString(36).substring(2, 12).toUpperCase(); 
};
