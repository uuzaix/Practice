def FizzBuzzer():
	for n in range (1,101):
		if n%3 ==0 and n%5 == 0:
			print 'FizzBuzz'
		else:
			if n%3 == 0:
				print 'Fizz'
			else:
				if n%5 == 0:
					print 'Buzz' 
				else:
					print n
FizzBuzzer() 
