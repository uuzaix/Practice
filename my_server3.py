import socket
import sys

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

host = 'localhost'
port = 8000
sock.bind((host, port))

sock.listen(1)

connection, address = sock.accept()

file_obj = connection.makefile()
first_line = file_obj.readline()
words = first_line.split()

if words[0] == 'GET' and len(words) > 1:
	path = words[1]
	message = 'HTTP/1.1 200 OK\n' + '\n' + 'Hello, %s' % path
else:
	raise Exception('Bad request')

for line in file_obj:
	if line == "\r\n":
		file_obj.writelines(message)
		break

connection.close()
	


