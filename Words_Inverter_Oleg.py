def invert_words(s):
	words_list = s.split()
	words_list.reverse()
	result = ' '.join(words_list)
	return result

def test(actual, expected):
	if actual == expected:
		print "Test passed"
	else:
		print "Test failed: expected: %s, got: %s" % (expected, actual)

def test_invert_words():
	test (invert_words('I am a cat'), 'cat a am I')
	test (invert_words('I am a cat'), 'I ma a tac')
	test (invert_words(''), '')
	
	
test_invert_words()
