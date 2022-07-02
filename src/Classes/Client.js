const { base, endpoints } = require('../Constants/endpoints');
const { get, request } = require('https');

class Client {
    constructor(options = {}) {
        if (!options.apikey) throw new Error("No apikey found for Phisherman API");
        if (!options.version) throw new Error("No version given for Phisherman API");
            this.apikey = options.apikey,
	    this.version = options.version
    };

	async check(url){
		if (!url) return "You did not supply a valid domain name!"
		const domain = url.replace("https://", "").replace("http://").split("/")[0].match(/(?:\w.*\.[a-z]+[a-z])/g)
		let options = {
			host: `${base}`,
			path: `/${endpoints[this.version].check}${domain}`,
			headers : {
		      		'Content-Type': 'application/json',
      				'Authorization': `Bearer ${this.apikey}`
			}
		};
	  return new Promise((resolve, reject) => {
		get(options, (res) => {
		const { statusCode } = res;
			if(statusCode !== 200) {
	        		res.resume();
        			if (statusCode == "401") reject("[ 401 ] You did not supply valid authentication credentials!")
        			if (statusCode == "429") reject("[ 429 ] Your request exceeded the API rate limit!")
        			if (statusCode == "400") reject("[ 400 ] Request was invalid of malformed!")
        			if (statusCode == "403") reject("[ 403 ] You are not allowed to perform that action!")
        			if (statusCode == "404") reject(`[ 404 ] the endpoint check doesnt exist on ${this.version}!`)
        			if (statusCode == "500") reject("[ 500 ] Unable to perform the request due to server-side problems!")
				reject(`Request failed. Status code: ${statusCode}`);
      			}
      		res.setEncoding('utf8');
      		let rawData = '';
      		res.on('data', (chunk) => {rawData += chunk});
      		res.on('end', () => {
        	try {
          		const parsedData = JSON.parse(rawData);
          		resolve(parsedData);
        	} catch(e) {
          		reject(`Error: ${e.message}`);
       		}
      		})
    		}).on('error', (err) => {
      			reject(`Error: ${err.message}`);
    			})
	    }).catch((err)=>{
		return err
            })
	}

	async info(url){
		if (!url) return "You did not supply a valid domain name!"
		const domain = url.replace("https://", "").replace("http://").split("/")[0].match(/(?:\w.*\.[a-z]+[a-z])/g)
		let options = {
			host: `${base}`,
			path: `/${endpoints[this.version].info}${url}`,
			headers : {
      				'Content-Type': 'application/json',
      				'Authorization': `Bearer ${this.apikey}`
   			}
		};
	  return new Promise((resolve, reject) => {
		get(options, (res) => {
		const { statusCode } = res;
			if(statusCode !== 200) {
	        		res.resume();
        			if (statusCode == "401") reject("[ 401 ] You did not supply valid authentication credentials!")
        			if (statusCode == "429") reject("[ 429 ] Your request exceeded the API rate limit!")
        			if (statusCode == "400") reject("[ 400 ] Request was invalid of malformed!")
        			if (statusCode == "403") reject("[ 403 ] You are not allowed to perform that action!")
        			if (statusCode == "404") reject(`[ 404 ] The endpoint info doesnt exist on ${this.version}!`)
        			if (statusCode == "500") reject("[ 500 ] Unable to perform the request due to server-side problems!")
				reject(`Request failed. Status code: ${statusCode}`);
      			}
      		res.setEncoding('utf8');
      		let rawData = '';
      		res.on('data', (chunk) => {rawData += chunk});
      		res.on('end', () => {
        	try {
          		const parsedData = JSON.parse(rawData);
          		resolve(parsedData);
        	} catch(e) {
          		reject(`Error: ${e.message}`);
       		}
      		});
    		}).on('error', (err) => {
      			reject(`Error: ${err.message}`);
    			})
	    }).catch((err)=>{
		return err
            })
	}

	async caught(url, guild){
		if (!guild) return "You did not supply a valid guild ID!";
		if (!url) return "You did not supply a valid domain name!"
		const domain = url.replace("https://", "").replace("http://").split("/")[0].match(/(?:\w.*\.[a-z]+[a-z])/g)
		console.log(domain)
		let data = JSON.stringify({"guild": guild})
		let options = {
			method: "POST",
			host: `${base}`,
			path: `/${endpoints[this.version].caught}${domain}`,
			headers : {
      				'Content-Type': 'application/json',
      				'Authorization': `Bearer ${this.apikey}`
   			},
			body: data
		};
		return new Promise((resolve, reject) => {
		get(options, (res) => {
		const { statusCode } = res;
			if(statusCode !== 200) {
	        		res.resume();
        			if (statusCode == "401") reject("[ 401 ] You did not supply valid authentication credentials!")
        			if (statusCode == "429") reject("[ 429 ] Your request exceeded the API rate limit!")
        			if (statusCode == "400") reject("[ 400 ] Request was invalid of malformed!")
        			if (statusCode == "404") reject(`[ 404 ] The caught doesnt exist on ${this.version}!`)
        			if (statusCode == "403") reject("[ 403 ] You are not allowed to perform that action!")
        			if (statusCode == "500") reject("[ 500 ] Unable to perform the request due to server-side problems!")
				reject(`Request failed. Status code: ${statusCode}`);
      			}
      		res.setEncoding('utf8');
      		let rawData = '';
      		res.on('data', (chunk) => {rawData += chunk});
      		res.on('end', () => {
        	try {
          		const parsedData = JSON.parse(rawData);
          		resolve(parsedData);
        	} catch(e) {
          		reject(`Error: ${e.message}`);
       		}
      		});
    		}).on('error', (err) => {
      			reject(`Error: ${err.message}`);
    			})
	    }).catch((err)=>{
		return err
            })
	}

	async report(url, guild){
		if (!guild) return "You did not supply a valid guild ID!";
		if (!url) return "You did not supply a valid domain name!"
		const domain = url.replace("https://", "").replace("http://").split("/")[0].match(/(?:\w.*\.[a-z]+[a-z])/g)
		let data = JSON.stringify({"url": domain[0]})
		console.log(data)
		let options = {
			method: "PUT",
			host: `${base}`,
			path: `/${endpoints[this.version].report}`,
			headers : {
      				'Content-Type': 'application/json',
      				'Authorization': `Bearer ${this.apikey}`
   			},
			body: data
		};
		return new Promise((resolve, reject) => {
		get(options, (res) => {
		const { statusCode } = res;
			if(statusCode !== 200) {
	        		res.resume();
        			if (statusCode == "404") reject(`[ 404 ] The endpoint report doesnt exist on ${this.version}!`)
        			if (statusCode == "401") reject("[ 401 ] You did not supply valid authentication credentials!")
        			if (statusCode == "429") reject("[ 429 ] Your request exceeded the API rate limit!")
        			if (statusCode == "400") reject("[ 400 ] Request was invalid of malformed!")
        			if (statusCode == "403") reject("[ 403 ] You are not allowed to perform that action!")
        			if (statusCode == "500") reject("[ 500 ] Unable to perform the request due to server-side problems!")
				reject(`Request failed. Status code: ${statusCode}`);
      			}
      		res.setEncoding('utf8');
      		let rawData = '';
      		res.on('data', (chunk) => {rawData += chunk});
      		res.on('end', () => {
        	try {
          		const parsedData = JSON.parse(rawData);
          		resolve(parsedData);
        	} catch(e) {
          		reject(`Error: ${e.message}`);
       		}
      		});
    		}).on('error', (err) => {
      			reject(`Error: ${err.message}`);
    			})
	    }).catch((err)=>{
		return err
            })
	}
}

module.exports = Client;
