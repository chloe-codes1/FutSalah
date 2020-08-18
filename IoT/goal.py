import time
import serial
import pusher

pusher_client = pusher.Pusher(
    app_id='1054340',
    key='d497d1d45ba8c0d76122',
    secret='57e912523619c930320f',
    cluster='ap3',
    ssl=True
)

def main():
    port = serial.Serial("/dev/ttyACM0", baudrate=9600, timeout=None)
    
    goal_data = [0] * 2
    
    while True:
        time.sleep(0.01)
        
        status = "nogoal"
        
        line = port.readline()
        arr = line.split()
        
        dis_data = float(arr[1])
        print("Distance: %.1f mm" % dis_data)
        
        time.sleep(0.06)
        
        vib_data = int(arr[-1])
        print("Vibration: %d" % vib_data)
        
        # and vib_data > 50
        if (dis_data < 85 or dis_data > 10000):
            status = "goal"
            goal_data[0] += 1
            
            # pusher
            pusher_client.trigger('channel', 'event', {'homeScore' : goal_data[0]})
            
            port.write("     {} : {}     ".format(goal_data[0], goal_data[1]).encode('utf-8'))
            time.sleep(10.00)
            
        time.sleep(0.05)        
                

if __name__ == "__main__":
    main()
