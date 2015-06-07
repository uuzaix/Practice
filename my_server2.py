import socket
import sys

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR,1)

server_address = ('localhost', 8005)
print 'starting up on %s port %s' % server_address
sock.bind(server_address)

# Listen for incoming connections
sock.listen(1)

# Wait for a connection
print 'waiting for a connection'
connection, client_address = sock.accept()

print 'connection from', client_address

data = connection.makefile()

for line in data:
	if line != '\r\n':
		#print line
		if line[:3] == 'GET':
			list_data = line.split()
			path = list_data[1]
			message = 'HTTP/1.1 200 OK\n' + '\n' +"Hello, %s" % path
			#print message			
		
	else:
		#print "1"		
		connection.sendall(message)
		break
connection.close()

