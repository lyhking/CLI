var fs = require('fs'),
	stdin = process.stdin,
	stdout = process.stdout;
/**
 * @param  {error} err    [错误对象]
 * @param  {[ ]} files)  [目录下的文件数组]
 * @param process.cwd()  [当前目录]
 */
fs.readdir(process.cwd(), function(err, files) {
	if (err) return console.error(err);
	//文件数为0操作
	if (!files.length) {
		return console.log('     \033[33m No files to show! \033[39m\n');
	}
	console.log(' Select which file or directory you want to see');
	var stats = []; //储存每个文件的信息
	//遍历输出文件目录
	function file(i) {
		var filename = files[i];

		fs.stat(__dirname + '/' + filename, function(err, stat) {
			stats[i] = stat;
			if (stat.isDirectory()) {
				//如果是文件夹
				console.log('   ' + i + '  \033[36m' + filename + '/\033[39m');
			} else {
				//如果是文件
				console.log('   ' + i + '  \033[90m' + filename + '\033[39m');
			};

			if (++i == files.length) {
				read();
			} else {
				file(i)
			};
		});
	}

	function read() {
		console.log();
		stdout.write('   \033[33m Enter you choice: \033[39m');
		stdin.resume(); //等待用户输入
		stdin.setEncoding('utf-8');
		stdin.on('data', option)
	};

	function option(data) {
		var filename = files[Number(data)];
		if (!filename) {
			stdout.write('   \033[31m Enter you choice: \033[39m');
		} else {
			stdin.pause();
			// console.log(stats);
			if (stats[Number(data)].isDirectory()) {
				fs.fs.readdir(__dirname + '/' + filename, function(err, files) {
					console.log('');
					console.log('   (' + files.length + ' files)');
					files.forEach(function(file) {
						console.log(' - ' + file);
					});
					console.log();
				});
			} else {
				fs.readFile(__dirname + '/' + filename, 'utf-8', function(err, data) {
					console.log();
					console.log('\033[90m' + data + '\033[39m');
				});
			}
		}
	}
	file(0);
});