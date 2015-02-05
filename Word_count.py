def word_count(s):
	words_list = s.split()
	result_dic = {}
	for word in words_list:
		counter = words_list.count(word)
		result_dic[word] = counter
	return result_dic

print word_count('I am a cat you are a cat too cat')

