def print_fizzbuzz_for(i):
	if i%3 == 0 and i%5 == 0:
		print "FizzBuzz"
	elif i%3 == 0:				
		print "Fizz"
	elif i%5 == 0:				
		print "Buzz"
	else:
		print i

def fizzbuzz(n):
	for i in range(1,n):
		print_fizzbuzz_for(i)
		
		
fizzbuzz(101) 
