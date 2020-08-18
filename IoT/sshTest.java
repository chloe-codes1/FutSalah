import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

public class sshTest {

	public static void main(String[] args) throws JSchException, InterruptedException {

		// python 실행
		test1();

		System.out.println("Sleeping...");
		Thread.sleep(10000);
		System.out.println("Rerun...");

		// python 종료
		test2();



	}

	public static void test2() throws JSchException {
		String name = "pi";
		// 라즈베리파이 ip
		String host = "192.168.219.109";
		int port = 22;
		String password = "root";

		System.out.println("==> Connectiong to " + host);
		Session session = null;
		Channel channel = null;

		try {
			// JSch 객체 생성
			JSch jsch = new JSch();
			session = jsch.getSession(name, host, port);

			// 패스워드 설정
			session.setPassword(password);

			// 세션 관련 정보 설정
			java.util.Properties config = new java.util.Properties();
			// 호스트 정보 검사 x
			config.put("StrictHostKeyChecking", "no");
			session.setConfig(config);

			// 접속
			session.connect();

			// sftp 채널 오픈
			channel = session.openChannel("exec");

			// SSH용 채널 객체로 캐스팅
			ChannelExec channelExec = (ChannelExec) channel;
			System.out.println("==> Connected to " + host);


			System.out.println("kill python3");
			channelExec.setCommand("sudo killall python3");
			channelExec.connect();

		} catch(Exception e) {

		}
		finally {
			if (channel != null) {
				channel.disconnect();
			}
			if (session != null) {
				session.disconnect();
			}
		}
	}

	public static void test1() throws JSchException {
		String name = "pi";
		String host = "192.168.219.109";
		int port = 22;
		String password = "root";

		System.out.println("==> Connectiong to " + host);
		Session session = null;
		Channel channel = null;

		try {
			// JSch 객체 생성
			JSch jsch = new JSch();
			session = jsch.getSession(name, host, port);

			// 패스워드 설정
			session.setPassword(password);

			// 세션 관련 정보 설정
			java.util.Properties config = new java.util.Properties();
			// 호스트 정보 검사 x
			config.put("StrictHostKeyChecking", "no");
			session.setConfig(config);

			// 접속
			session.connect();

			// sftp 채널 오픈
			channel = session.openChannel("exec");

			// SSH용 채널 객체로 캐스팅
			ChannelExec channelExec = (ChannelExec) channel;
			System.out.println("==> Connected to " + host);

			channelExec.setCommand("python3 /home/pi/Desktop/goal.py");

			channelExec.connect();
			System.out.println("==> Connected to " + host);

		} finally {
			if (channel != null) {
				channel.disconnect();
			}
			if (session != null) {
				session.disconnect();
			}
		}
	}
}