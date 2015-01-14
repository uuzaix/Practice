def invert_letters(s):
	words_list = s.split()
	inverted_list = []
	for word in words_list:
		inverted_list.append (word[::-1])
	result = ' '.join(inverted_list)
	return result

def test(actual, expected):
	if actual == expected:
		print "Test passed"
	else:
		print "Test failed: expected: %s, got: %s" % (expected, actual)

def test_invert_letters():
	test (invert_letters('I am a cat'), 'I ma a tac')
	test (invert_letters(''), '')
	
	
test_invert_letters()

invert_letters('I am a cat')
