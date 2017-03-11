'use strict'
const path = require('path')
const fs = require('fs-extra')
const grayMatter = require('gray-matter')
module.exports = options => {
	return (files, metalsmith, done) => {
		// Default options
		options = Object.assign({
			pattern: [ '**/*' ],
			ignore: [],
			overrideDate: false,
			lastModified: false
		}, options)
		if(typeof options.pattern === 'string') options.pattern = [ options.pattern ]

		// Process all files
		const promises = []
		for(let filePath in files){
			const setObj = {}

			// Set creation date
			if(options.overrideDate === true || !files[filePath].date){
				setObj.date = files[filePath].stats.birthtime
			}

			// Set modified date
			if(options.lastModified === true){
				setObj.modified = files[filePath].stats.mdate
			}

			// Add to file object
			for(let i in setObj){
				files[filePath][i] = setObj[i]
			}

			if(Object.keys(setObj).length){
				const absPath = path.resolve(metalsmith._directory, metalsmith._source, filePath)
				promises.push(processFile(absPath, setObj))
			}

		}

		Promise.all(promises)
			.then(() =>  done())
			.catch(console.error)

	}
}

// Save timestamps to gray matter
function processFile(path, obj){
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if(err){
				reject(err)
			}
			else{
				data = data.toString('utf8')
				let file = grayMatter(data)
				for(let i in obj){
					file.data[i] = obj[i]
				}

				file = grayMatter.stringify(file.content, file.data)
				fs.outputFile(path, file, err => {
					if(err) reject(err)
					else resolve()
				})
			}
		})
	})
}