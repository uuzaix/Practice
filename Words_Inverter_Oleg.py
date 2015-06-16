#def invert_words(s):
	#words_list = s.split()
	#words_list.reverse()
	#result = ' '.join(words_list)
	#return result

def invert_letters(s):
	words_list = s.split()
	print words_list
	inverted_words = []
	for word in words_list:
		index = 0
		single_word = []
		for letter in word:
			a = len(word)-1-index
			single_word.insert (a, letter)
			print single_word
			index = index + 1
			inverted_words.append (single_word)
	print inverted_words
			
	#result = ' '.join(words_list)
	#return result

#def test(actual, expected):
	#if actual == expected:
		#print "Test passed"
	#else:
		#print "Test failed: expected: %s, got: %s" % (expected, actual)

#def test_invert_words():
	#test (invert_words('I am a cat'), 'cat a am I')
	#test (invert_words('I am a cat'), 'I ma a tac')
	#test (invert_words(''), '')
	
	
#test_invert_words()

invert_letters('123456')
